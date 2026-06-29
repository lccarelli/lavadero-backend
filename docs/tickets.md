# Tickets - TP Integrador Lavadero

## Filosofía

**Tickets de setup (TK-S-XX):** son horizontales por naturaleza. No se puede testear el backend sin tenerlo levantado, ni la conexión a la DB sin tener MySQL andando. Estos se hacen primero, en orden.

**Tickets fullstack (TK-F-XX):** desde el primero, cada ticket entrega una funcionalidad **end-to-end**: Frontend + Backend + persistencia + tests del lado que aplique. Al cerrar un ticket fullstack, una feature está andando completa.

---

# FASE 1: Setup inicial (horizontal)

## TK-S-01: Bootstrap del proyecto y repos

**Objetivo:** Tener los dos repositorios creados, clonados localmente, con la estructura base del esqueleto que armamos.

**Tareas:**
- [ ] Crear repo `autoservicio-lavadero-autos` en GitHub
- [ ] Clonar en `tp-lavadero/`
- [ ] Copiar los esqueletos generados a cada repo
- [ ] Commitear estructura inicial en ambos
- [ ] Crear GitHub Project (board `autoservicio-lavadero-autos`) y conectarlo el repo `autoservicio-lavadero-autos`

**Criterio de aceptación:**
- El GitHub Project muestra columnas Backlog/En progreso/En revisión/Done

**Estimación:** 30 min
**Fullstack:** (es setup puro)

---

## TK-S-02: Dockerización - compose con MySQL + backend + frontend

**Objetivo:** Que con un `docker-compose up` se levante MySQL, backend y frontend, todo conectado. Los testers no instalan nada salvo Docker Desktop.

**Tareas:**
- [ ] Crear `backend/Dockerfile` (`FROM node:18-alpine`, copy package.json, npm install, copy src/, EXPOSE 3000, CMD `node src/app.js`)
- [ ] Crear `frontend/Dockerfile` (`FROM nginx:alpine`, COPY `public/` a `/usr/share/nginx/html`)
- [ ] Crear `docker-compose.yml` en la raíz con servicios `mysql`, `backend`, `frontend`
- [ ] Configurar volume `mysql_data` para persistencia de la BD
- [ ] Configurar volume `./backend/uploads` para persistencia de imágenes
- [ ] Configurar `depends_on: mysql` en el servicio backend
- [ ] Crear `backend/.env.example` con `DB_HOST=mysql`, `DB_NAME=lavadero_db`, etc.
- [ ] Documentar en README los puertos: frontend `8080`, API `3000`, MySQL `3306`
- [ ] Conectar IntelliJ DataGrip a MySQL del contenedor (host `localhost`, port `3306`)

**Criterio de aceptación:**
- `docker-compose up` levanta los 3 servicios sin errores
- `http://localhost:8080` devuelve un HTML (aunque sea placeholder)
- `http://localhost:3000/health` responde `{ status: "ok" }`
- Una query desde IntelliJ DataGrip (`SHOW DATABASES;`) muestra `lavadero_db`
- `docker-compose down` apaga todo limpiamente
- `docker-compose down && docker-compose up` reinicia sin perder datos de la BD

**Estimación:** 1.5 hs
**Fullstack:** (es setup de infra)

---

## TK-S-03: Backend arranca dentro de Docker y se conecta a la DB

**Objetivo:** El backend dockerizado se conecta a MySQL del compose y responde el `/health`.

**Tareas:**
- [ ] Copiar `backend/.env.example` a `backend/.env`
- [ ] Importar y llamar `testConnection()` en `src/app.js` antes del `listen`
- [ ] Endpoint `GET /health` que responde `{ status: "ok", timestamp: ... }`
- [ ] Test del endpoint con Supertest (corre **fuera del contenedor**, con `npm test` local)
- [ ] Verificar que el log del contenedor muestra "Conexión a MySQL establecida"

**Criterio de aceptación:**
- `docker-compose up backend` arranca sin errores y muestra "Conexión a MySQL establecida"
- `GET http://localhost:3000/health` devuelve `{ status: "ok", timestamp: "..." }`
- `cd backend && npm test` corre el test de health y pasa
- Si se apaga MySQL, el backend muestra un error claro al intentar conectar

**Estimación:** 45 min
**Fullstack:** (es setup)

---

## TK-S-04: Frontend (nginx) sirve estáticos y hace fetch al backend

**Objetivo:** El frontend dockerizado sirve un HTML mínimo desde nginx, y un script JS hace fetch al `/health` del backend para verificar que la comunicación funciona end-to-end (CORS incluido).

**Tareas:**
- [ ] Crear `frontend/public/index.html` placeholder con un `<div id="status">cargando...</div>`
- [ ] Crear `frontend/public/js/api.js` con `const API_URL = 'http://localhost:3000/api'` y función `get(path)` que envuelve `fetch`
- [ ] Crear `frontend/public/js/main.js` que importe `api.js`, llame al `/health`, y pinte la respuesta en `#status`
- [ ] Habilitar CORS en el backend para el origen `http://localhost:8080`
- [ ] Crear `frontend/package.json` con `vitest` y `jsdom` como devDeps
- [ ] Crear `frontend/vitest.config.js` con `environment: 'jsdom'`
- [ ] Crear `frontend/tests/api.test.js` con un test mock de `fetch` que verifica que `api.get('/health')` arma la URL correcta

**Criterio de aceptación:**
- `http://localhost:8080` muestra "AutoLavado Express - Setup OK" con la respuesta del `/health` debajo
- No hay errores de CORS en la consola del navegador
- `cd frontend && npm install && npm test` corre los tests del módulo `api.js` y pasan

**Estimación:** 1 hs
**Fullstack:** (es setup)

---

## TK-S-05: GitHub Actions opcional (CI básico)

**Objetivo:** Cada PR corre los tests automáticamente.

**Tareas:**
- [ ] Crear `.github/workflows/tests.yml` en cada repo
- [ ] Workflow corre `npm install` + `npm test` en push y PR
- [ ] Verificar que se ejecuta correctamente

**Criterio de aceptación:**
- PRs muestran el check de "tests passing" antes de poder mergear

**Estimación:** 30 min
**Fullstack:** (es infra)
**Prioridad:** baja (es nice-to-have, podemos saltearlo si vamos justos de tiempo)

---

## TK-S-06: Hot reload en desarrollo (compose dev)

**Objetivo:** Que en desarrollo el código se recargue solo, sin rebuildear la imagen ni reiniciar contenedores a mano. El compose base (producción) no se toca.

**Tareas:**
- [ ] Crear `docker-compose.dev.yml` como override de desarrollo (no se carga solo; se activa explícito)
- [ ] Backend: montar `./src`, `./seeders` y `./uploads` como volúmenes del host (hot reload sin rebuild)
- [ ] Backend: arrancar con `npm run dev` (`node --watch src/app.js`) en vez de `node src/app.js`
- [ ] Backend: construir la imagen con dev deps vía `ARG INSTALL_DEV=true`
- [ ] Frontend: montar `../lavadero-frontend/public` en `/usr/share/nginx/html:ro`
- [ ] Script `docker:dev` en `package.json`
- [ ] Documentar el flujo de dev en el README

**Criterio de aceptación:**
- `npm run docker:dev` levanta los 3 servicios con el override aplicado
- Editar un archivo de `src/` reinicia el backend solo, sin `docker compose build`
- Editar un archivo de `public/` del frontend se ve al refrescar, sin rebuild
- `docker compose up --build` (sin override) sigue arrancando en modo producción

**Estimación:** 1 h
**Fullstack:** no (es infra de DX)

---

# FASE 2: Tickets fullstack

A partir de acá, cada ticket toca BD + backend + frontend + tests donde corresponda.

## TK-F-01: Modelo Categoria + endpoint de listado

**Objetivo:** Tener las categorías "Lavados" y "Accesorios" en BD, expuestas vía API, y consumidas desde el frontend con `fetch`.

**Capas que toca:**
- **DB:** Modelo `Categoria` (id, nombre, descripcion). Seeder con las 2 categorías base.
- **Backend:** Endpoint `GET /api/categorias`. Test del endpoint.
- **Frontend:** Función `getCategorias()` en `js/api.js` que llama al endpoint. En `productos.html`, el JS de la página la usa al cargar y por ahora hace `console.log()` para verificar.
- **Tests:** Test del endpoint (Supertest). Test de `getCategorias()` con `fetch` mockeado (Vitest + jsdom).

**Criterio de aceptación:**
- Al correr `docker-compose exec backend npm run seed`, la tabla `categorias` tiene 2 filas
- `GET /api/categorias` devuelve un array con 2 objetos
- El frontend logea las categorías en consola al cargar `productos.html`
- Todos los tests pasan

**Estimación:** 1.5 hs
**Casos de uso relacionados:** CU-2.1.1, CU-2.2.1, CU-3.1.3

---

## TK-F-02: Modelo Producto + alta + listado paginado

**Objetivo:** Productos en BD con todas sus columnas, endpoint de listado paginado, endpoint de alta, pantalla `productos.html` que los lista con tabs y paginación.

**Capas que toca:**
- **DB:** Modelo `Producto` con FK a Categoria. Relación 1:N. Seeder con 16 productos (8 por categoría).
- **Backend:**
  - `GET /api/productos?page=&limit=&categoria=&activo=` con paginación
  - `POST /api/productos` con multer para imagen (admin only, pero el middleware de auth viene en otro ticket — por ahora dejar abierto)
  - Validaciones con express-validator
  - Tests: happy path, validación falla, paginación
- **Frontend:**
  - `productos.html` con estructura: header + tabs (Lavados/Accesorios) + grid de cards + controles de paginación
  - `js/productos.js` que orquesta: lee la categoría activa, hace fetch a `/api/productos`, renderiza las cards en el DOM, maneja click en tabs y en botones de paginación
  - Función reutilizable `renderProductoCard(producto)` en `js/productos.js` que devuelve un `<article>` con el HTML de una card
  - Estilos en `css/components.css` para `.producto-card` y `.productos-grid` con media queries (1 col / 2 col / 3-4 col)
  - Tests del módulo `productos.js` con jsdom: cargar un HTML de prueba, mockear `fetch`, verificar que se renderizan las cards correctas
- **Tests:** Endpoint con Supertest, módulos JS con Vitest + jsdom

**Criterio de aceptación:**
- Seeder crea 16 productos activos
- `GET /api/productos?page=1&limit=8` devuelve 8 productos + objeto de paginación
- `productos.html` muestra los productos con tabs funcionales y paginación
- Tests pasan

**Estimación:** 4-5 hs
**Casos de uso relacionados:** CU-2.1.2, CU-2.2.2, CU-3.1.1, CU-3.2.1, CU-3.3.1, CU-5.2.1, CU-5.2.2, CU-5.2.3

---

## TK-F-03: Entidad Usuario + endpoint de creación

**Objetivo:** Modelo `Usuario` único que soporta cliente y admin, y el endpoint de creación del usuario cliente.

**Capas que toca:**
- **DB:** Modelo `Usuario` con `nombre`, `email` (único, null para clientes), `password` (hash, null para clientes) y `esAdmin`. Hook `beforeSave` que hashea el password con bcrypt solo si hay password (los clientes no tienen).
- **Backend:**
  - `POST /api/usuarios` body `{ nombre }`: crea (o encuentra) un usuario cliente (`esAdmin=false`) por nombre. Valida nombre ≥ 2 caracteres. Devuelve `{ id, nombre }`.
  - Tests: creación de cliente, find-or-create idempotente, validación de nombre.

**Criterio de aceptación:**
- Una sola entidad cubre ambos tipos (el admin reutiliza el modelo, sin tabla aparte).
- `POST /api/usuarios` crea el cliente y es idempotente por nombre.
- Tests pasan.

**Estado:** ✅ Hecho — `src/models/Usuario.js`, `src/controllers/usuarioController.js` (`crearUsuario`), `src/routes/api/usuarios.js`; tests en `tests/usuarioModel.test.js` y `tests/usuarios.test.js`.

**Estimación:** 1.5 hs
**Casos de uso relacionados:** CU-2.1.3

---

## TK-F-03.2: Creación de usuario admin + login admin

**Objetivo:** Alta de usuarios admin, login con sesión, middleware de protección y vista EJS de login del backoffice.

**Capas que toca:**
- **Backend:**
  - `POST /api/auth/registro-admin` (crea admin con email único + password hasheado)
  - `POST /api/auth/login` (API; 401 sin filtrar si el email existe)
  - `GET /admin/login` (vista EJS) y `POST /admin/login` (procesa el form e inicia sesión)
  - `POST /admin/logout` (destruye la sesión)
  - Middleware `requireAdmin` (redirige a login en vistas, 401 en API)
  - Seeder de admin de prueba (admin@lavadero.com / admin123)
  - Tests: hash funciona, login exitoso, login fallido, middleware bloquea sin sesión
- **Vistas EJS:**
  - `login.ejs` con form + botón de acceso rápido (autocompleta las credenciales del seed)
  - Layout base con header y nav del admin
- **Frontend:**
  - Link `<a href="http://localhost:3000/admin/login">Login admin</a>` en el header del cliente
  - (El backoffice admin es EJS server-rendered por el backend — el frontend de nginx solo expone el flujo del cliente)

**Criterio de aceptación:**
- `POST /api/auth/registro-admin` crea un admin con password hasheado
- `POST /admin/login` con credenciales del seed redirige a `/admin/dashboard`
- Botón de acceso rápido autocompleta los inputs
- Acceder a `/admin/dashboard` sin sesión redirige a login
- Tests pasan

**Estado:** Pendiente
**Estimación:** 3-4 hs
**Dependencias:** TK-F-03
**Casos de uso relacionados:** CU-2.2.3, CU-4.1.1, CU-4.2.1, CU-4.2.2, CU-4.2.3, CU-4.2.4, CU-4.2.5

---

## TK-F-04: Backoffice - Dashboard y CRUD completo de productos

**Objetivo:** Admin puede listar, crear, editar, activar y desactivar productos desde el panel EJS.

**Capas que toca:**
- **Backend:**
  - `PUT /api/productos/:id`
  - `PATCH /api/productos/:id/activar`
  - `PATCH /api/productos/:id/desactivar`
  - `GET /api/productos/:id`
- **Vistas EJS:**
  - `dashboard.ejs` con tabla de productos
  - `productoForm.ejs` (reutilizable para alta y edición)
  - Modales de confirmación de activar/desactivar
- **Tests:** todos los endpoints nuevos

**Criterio de aceptación:**
- Dashboard lista todos los productos con sus estados
- Botón "agregar" lleva al form de alta
- Botón "editar" lleva al form precargado
- Botones de activar/desactivar abren modal y al confirmar cambian el estado
- Tests pasan

**Estimación:** 5-6 hs
**Casos de uso relacionados:** CU-3.1.2, CU-3.2.2, CU-3.2.3, CU-3.2.4, CU-3.3.2, CU-6.1.1, CU-6.1.2, CU-6.1.3, CU-6.2.1, CU-6.2.2, CU-6.2.3
**Dividido en sub-tickets:** TK-F-04.01 → TK-F-04.02 → TK-F-04.03 → TK-F-04.04 (ver detalle en `board-issues.md`)

---

## TK-F-04.01: API CRUD de escritura de productos + validación de imagen

**Objetivo:** Endpoints API de alta/edición/activación de producto y validación de imagen, con lógica reutilizable por las vistas del backoffice.

**Capas que toca:**
- **Backend:**
  - `POST /api/productos` (multipart, multer, `activo=true`)
  - `PUT /api/productos/:id` (imagen opcional, borra la anterior)
  - `PATCH /api/productos/:id/desactivar` (baja lógica, `activo=false`)
  - `PATCH /api/productos/:id/activar` (reactivación)
  - Config `multer` reutilizable (mime permitido + `UPLOAD_MAX_SIZE_MB`)
  - Middleware de validación de imagen (mime + tamaño)
  - Service/controller compartido (lo consumen la API y las vistas server-rendered)
  - `requireAdmin` en las rutas de escritura
  - Tests: alta, PUT (happy/404/validación), PATCH activar/desactivar, imagen inválida

**Criterio de aceptación:** alta crea con imagen; editar cambia datos/imagen (borra la previa); activar/desactivar togglean estado; imagen inválida → 400; tests pasan.

**Estado:** En progreso
**Estimación:** 2.5 hs
**Dependencias:** TK-F-03.2 (`requireAdmin`)
**Casos de uso relacionados:** CU-3.2.1, CU-3.2.2, CU-3.2.3, CU-3.2.4, CU-3.3.2

---

## TK-F-04.02: Dashboard - tabla de productos con estado

**Objetivo:** Vista EJS del panel que lista todos los productos (activos e inactivos) con su estado.

**Capas que toca:**
- **Backend:** ruta `GET /admin/productos` con `requireAdmin`
- **Vistas EJS:** `views/admin/productos.ejs` (tabla: nombre, categoría, precio, estado); reusa `admin-header` + estilos en `admin.css`

**Criterio de aceptación:** el admin ve la tabla con todos los productos y su estado; sin sesión redirige al login.

**Estado:** Pendiente
**Estimación:** 1.5 hs
**Dependencias:** TK-F-03.2
**Casos de uso relacionados:** CU-6.1.1

---

## TK-F-04.03: Alta y edición de producto (vistas server-rendered)

**Objetivo:** Form de alta/edición (reutilizado) que postea a rutas admin y redirige a la tabla.

**Capas que toca:**
- **Backend:** rutas admin `GET /admin/productos/nuevo`, `POST /admin/productos`, `GET /admin/productos/:id/editar`, `POST /admin/productos/:id`. Reusa el service/controller de TK-F-04.01; re-render con errores de validación
- **Vistas EJS:** `views/admin/producto-form.ejs` (alta y edición)

**Criterio de aceptación:** alta crea y vuelve a la tabla con el producto nuevo; edición precarga y guarda; validaciones muestran errores en la misma vista.

**Estado:** Pendiente
**Estimación:** 2 hs
**Dependencias:** TK-F-04.01, TK-F-04.02
**Casos de uso relacionados:** CU-6.1.3, CU-6.2.1, CU-6.2.2

---

## TK-F-04.04: Acciones activar/desactivar + modales de confirmación

**Objetivo:** Acciones por fila con confirmación por modal, server-rendered.

**Capas que toca:**
- **Backend:** rutas admin `POST /admin/productos/:id/activar`, `POST /admin/productos/:id/desactivar`
- **Vistas EJS:** botones de acción por fila + modal `<dialog>` de confirmación; redirige a la tabla tras la acción

**Criterio de aceptación:** activar/desactivar por modal cambian el estado y se reflejan en la tabla; "editar" lleva al form precargado.

**Estado:** Pendiente
**Estimación:** 1.5 hs
**Dependencias:** TK-F-04.01, TK-F-04.02
**Casos de uso relacionados:** CU-6.1.2, CU-6.2.3

---

## TK-F-05: Flujo cliente - Bienvenida + carrito + venta

**Objetivo:** Cliente puede ingresar su nombre, navegar productos, agregar al carrito, modificar cantidades y finalizar compra.

**Capas que toca:**
- **DB:** Modelos `Venta` y `VentaProducto` con relación M:N. Snapshot de precio.
- **Backend:**
  - `POST /api/ventas` (con transacción y cálculo de total server-side)
  - Tests: happy path, productos inexistentes, cantidad inválida
- **Frontend:**
  - `index.html` (bienvenida) con input de nombre. JS guarda en `sessionStorage` y navega a `productos.html`
  - `js/carrito.js` con funciones puras: `getCarrito()`, `agregar(producto)`, `quitar(productoId)`, `setCantidad(id, n)`, `total()`, `vaciar()`. Todo respaldado por `sessionStorage` con clave `carrito`
  - Botones +/- en las cards de `productos.html` que llaman a las funciones de `carrito.js`
  - `carrito.html` que renderiza items del carrito leyendo de `sessionStorage`, permite modificar cantidades, mostrar total, y abrir un modal de confirmación
  - Modal de confirmación implementado como `<dialog>` HTML (API nativa, sin librerías)
  - Header en todas las pantallas con badge de items (un `<span>` actualizado por `nav.js` al cargar cada página y después de cada operación)
- **Tests:**
  - Módulo `carrito.js` con Vitest puro (sin DOM): tests de agregar/quitar/total con sessionStorage mockeado
  - Tests del endpoint `POST /api/ventas` con Supertest

**Criterio de aceptación:**
- Sin nombre ingresado, no se puede ir a productos (redirect desde `productos.html` si falta `clienteNombre` en sessionStorage)
- Agregar y quitar items del carrito funciona, los cambios sobreviven a navegar entre `.html` y a refrescar la página
- Modal de confirmación aparece al finalizar y muestra el resumen
- `POST /api/ventas` persiste la venta con total calculado server-side (cliente nunca manda el total)
- Tests pasan

**Estimación:** 6-7 hs
**Casos de uso relacionados:** CU-2.1.4, CU-2.1.5, CU-5.1.1, CU-5.2.4, CU-5.2.5, CU-5.2.6, CU-5.3.1, CU-5.3.2, CU-5.3.3, CU-5.3.4, CU-5.3.5

---

## TK-F-06: Ticket + PDF + reinicio del flujo

**Objetivo:** Después de la compra, se muestra el ticket con datos, se puede descargar en PDF, y el botón "salir" reinicia todo.

**Capas que toca:**
- **Frontend:**
  - `ticket.html` con la estructura del ticket (nombre empresa, cliente, fecha, productos, total)
  - `js/ticket.js` que lee la venta recién creada de `sessionStorage` (clave `ultimaVenta`) o vuelve a pedirla por ID con `fetch` y pinta los datos en el DOM
  - jsPDF cargado por `<script src="https://cdnjs.cloudflare.com/...jspdf...js">` en `ticket.html`
  - Botón "Descargar PDF" que invoca jsPDF con los datos del ticket
  - Botón "Salir" que hace `sessionStorage.clear()` y `window.location.href = 'index.html'`
- **Tests:**
  - Función `formatearTicket(venta)` que devuelve un objeto con texto formateado — testeada con Vitest puro
  - Función `generarPDF(venta)` testeada con jsPDF mockeado (verificar que se invoca con los datos correctos, no validar el PDF en sí)

**Criterio de aceptación:**
- `ticket.html` muestra: nombre cliente, fecha, productos con cantidades, subtotales, total, nombre empresa
- Botón descarga genera un PDF con los mismos datos
- Botón salir limpia sessionStorage y vuelve a `index.html`
- Tests pasan

**Estimación:** 3 hs
**Casos de uso relacionados:** CU-5.4.1, CU-5.4.2, CU-5.4.3

---

## TK-F-07: Reportes - Excel de ventas

**Objetivo:** Admin descarga Excel con todas las ventas y sus productos.

**Capas que toca:**
- **Backend:**
  - `GET /admin/ventas/excel` con exceljs
  - `GET /api/ventas` con eager loading de productos
- **Vistas EJS:**
  - Botón en dashboard
- **Tests:** Endpoint genera archivo correcto (validar estructura)

**Estimación:** 2 hs
**Casos de uso relacionados:** CU-7.1.1, CU-7.1.2

---

## TK-F-08: Temas claro/oscuro + responsive + branding global

**Objetivo:** Toggle de tema persistente, todas las pantallas responsive, branding consistente.

**Capas que toca:**
- **Frontend:**
  - `css/theme.css` con variables CSS en `:root` (claro) y `[data-theme="dark"]` (oscuro)
  - `js/tema.js`: funciones `aplicarTema(t)` (cambia `data-theme` del `<html>`), `toggleTema()`, `cargarTema()` (lee localStorage). Llamado al inicio de cada página
  - Script inline en el `<head>` de cada HTML que lee localStorage y aplica el tema ANTES del primer render (evita el flash de tema incorrecto)
  - Botón toggle en el header (vía `nav.js` que lo renderiza junto con el header)
  - QA responsive en todas las pantallas (375px, 768px, 1280px)
  - Header con logo + nombre app + nombres de integrantes en TODAS las pantallas (responsabilidad de `nav.js`)
  - Favicon en `frontend/public/assets/favicon.ico`, linkeado desde el `<head>` de cada HTML
- **Tests:** funciones de `tema.js` con localStorage mockeado, verificar que `toggleTema()` cambia el data-attribute

**Estimación:** 3-4 hs
**Casos de uso relacionados:** CU-1.2.2, CU-1.2.3, CU-1.2.4, CU-5.2.3, CU-10.1.1, CU-10.1.2

---

## TK-F-09 a TK-F-12: Tickets de final (final)

Solo si necesitamos entregar para final (no para cursada):

- **TK-F-09:** Encuesta (modelo + endpoint + pantalla + upload de imagen)
- **TK-F-10:** Detalle de producto (`/productos/:id`)
- **TK-F-11:** Logs de login + pantalla de registros
- **TK-F-12:** Estadísticas (top 10 productos, top 10 ventas, etc.)

---

# Resumen de orden sugerido

```
FASE 1 (setup - ~3 hs total):
TK-S-01 → TK-S-02 → TK-S-03 → TK-S-04 → [TK-S-05 opcional]

FASE 2 (fullstack - cursada, ~30 hs):
TK-F-01 → TK-F-02 → TK-F-03 → TK-F-03.2 → TK-F-04 (.01 → .02 → .03 → .04) → TK-F-05 → TK-F-06 → TK-F-07 → TK-F-08

FASE 3 (fullstack - final, ~15 hs):
TK-F-09 → TK-F-10 → TK-F-11 → TK-F-12
```

**Total cursada:** ~33 horas
**Total final:** ~48 horas

Dividido entre 2 personas, **~17 hs c/u para cursada**. Distribuido en 5-6 semanas son 3 hs por semana por persona. Holgado.

---

# Cómo usar este documento

1. Crear un issue en GitHub Projects por cada ticket de esta lista (formato `[TK-S-01] Bootstrap del proyecto y repos`).
2. En cada issue, copiar las tareas como checklist y el criterio de aceptación.
3. Vincular el ticket al CU del backlog si aplica.
4. Tomar un ticket fullstack significa abrir una branch tipo `feature/tk-f-02-listado-productos` y trabajar todas las capas en esa branch antes de mergear.
