# Tests del backend

Suite de tests automatizados de la API. Cubre todos los flujos de los endpoints (happy path + errores) y la lógica de negocio crítica.

## Cómo correr

Los tests corren **fuera de Docker**, en la máquina local (más rápido para iterar).
Necesitás Node 18+ instalado.

```bash
npm install        # solo la primera vez
npm test           # corre toda la suite una vez
npm run test:watch # modo watch (re-corre al guardar)
```

## Estrategia: SQLite en memoria

Los tests **no usan el MySQL real**. En `src/config/database.js`, cuando `NODE_ENV=test` (Vitest lo setea automáticamente), Sequelize se conecta a una base
**SQLite en memoria** (`:memory:`) en vez de MySQL:

- Es una base **real** (no un mock), así que se prueba el camino completo ruta → controller → query SQL → respuesta: los `where`, los `include`/JOIN, las transacciones, los hooks del modelo. Todo lo que un mock dejaría sin cubrir.
- Es **descartable y aislada**: vive en RAM, se crea y se destruye por test, no ensucia ninguna base ni depende de tener MySQL levantado.
- Es **rápida**: la suite completa corre en menos de 1 segundo.

Como los modelos usan solo tipos estándar de Sequelize (`INTEGER`, `STRING`, `DECIMAL`, `BOOLEAN`), SQLite es equivalente a MySQL para estas consultas. No se testean detalles específicos del motor MySQL.

> Nota sobre `DECIMAL`: MySQL lo devuelve como string y SQLite como número. Por eso
> los asserts de precios usan `Number(...)`, para tolerar ambos.

## Patrones de testing aplicados

- **AAA (Arrange-Act-Assert)**: cada test arma el escenario, ejecuta una acción y verifica el resultado. Está marcado con comentarios para que se lea claro.
- **Aislamiento por test**: un `beforeEach` recrea la base (`sync({ force: true })`) y la crea de cero. Ningún test depende del estado que dejó otro, así que el orden no importa y no hay falsos positivos por datos arrastrados.
- **Test Data Builder / Factory**: `tests/helpers/db.js` centraliza la siembra de datos base (categorías, productos, cliente). Los tests piden ids reales en vez de hardcodear, y no repiten setup.
- **Happy path + errores**: cada endpoint tiene al menos un caso exitoso y sus casos de error (400/404), verificando código de estado y mensaje.
- **Tests sobre comportamiento, no implementación**: se asierta sobre lo que la API responde (status + body), no sobre cómo lo hace por dentro.
- **HTTP real sin servidor**: `supertest` monta la app de Express en un puerto efímero y le pega de verdad. `app.js` no arranca el `listen` en modo test.

## Qué cubre cada archivo

Cada archivo prueba el caso normal (happy path) **y** sus casos de error o borde.
La suite tiene 35 tests en total.

| Archivo                | Endpoint / unidad        | Caso normal                                                                                                    | Casos de error / borde                                                                                                           |
|------------------------|--------------------------|----------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------|
| `health.test.js`       | `GET /health`            | 200 con `status: ok` y timestamp                                                                               | (sin entrada: no tiene rama de error)                                                                                            |
| `categorias.test.js`   | `GET /api/categorias`    | lista las 2 categorías ordenadas                                                                               | base vacía → array vacío (no error)                                                                                              |
| `productos.test.js`    | `GET /api/productos`     | forma `{ data, pagination }`; categoría anidada (JOIN); filtro `activo=true`; filtro por categoría; paginación | categoría sin productos → data vacío y total 0; página fuera de rango → data vacío conservando el total                          |
| `productos.test.js`    | `GET /api/productos/:id` | 200 con su categoría                                                                                           | 404 inexistente; 400 id no numérico; 400 id 0; 400 id negativo                                                                   |
| `usuarios.test.js`     | `POST /api/usuarios`     | 201 con `{ id, nombre }`; idempotente; no expone `password`                                                    | 400 nombre corto; 400 sin nombre; 400 nombre solo espacios                                                                       |
| `ventas.test.js`       | `POST /api/ventas`       | 201 con **total calculado en backend**; **snapshot de precio**; **rollback transaccional**                     | 400 sin usuario; 400 carrito vacío; 400 `items` no-array; 400 producto inactivo; 400 producto inexistente; 400 cantidad inválida |
| `ventas.test.js`       | `GET /api/ventas/:id`    | 200 con usuario e items                                                                                        | 404 inexistente; 404 id no numérico                                                                                              |
| `usuarioModel.test.js` | Modelo `Usuario`         | admin: hashea el password (`bcrypt.compare` lo valida); cliente sin password no dispara el hook                | email duplicado → rechaza (índice único)                                                                                         |

## Tests destacados (requisitos del TP)

Tres casos prueban requisitos del enunciado que un mock no podría verificar:

1. **Total calculado en el backend** (`ventas.test.js`): el front manda solo `[{ producto_id, cantidad }]`; el test confirma que el `precioTotal` lo calcula el servidor con los precios reales.
2. **Snapshot de precio** (`ventas.test.js`): se registra una venta, **después** se sube el precio del producto, y se verifica que la venta conserva el precio viejo. Prueba que el precio no se actualiza retroactivamente.
3. **Rollback transaccional** (`ventas.test.js`): una venta con un ítem válido y uno inválido falla entera; el test verifica que **no quedó ninguna venta** a medias.

## Estructura

```
tests/
  helpers/
    db.js              # crear, guarda y limpieza de la base (factory + aislamiento)
  health.test.js
  categorias.test.js
  productos.test.js
  usuarios.test.js
  ventas.test.js
  usuarioModel.test.js
```
