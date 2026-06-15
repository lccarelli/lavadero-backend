# Documento de trazabilidad
## TP Integrador Programación III - Lavadero Autoservicio

**Propósito:** mapear cada caso de uso del proyecto con su consigna original del enunciado, su justificación técnica, y el link al task de GitHub Projects para tracking de commits y MRs.

**Convenciones:**
- (obligatorio) Cursada | (final) Final | (infra) Técnico/Infra
- Estados: `Pendiente` | `En progreso` | `En revisión` | `Completado`
- En cada caso: reemplazar `[completar-link]` con el link real al issue/task de GitHub

---

## Tabla maestra

| ID | Caso de uso | Tipo | Sprint | Estado | GitHub |
|----|-------------|------|--------|--------|--------|
| CU-1.1.1 | Inicializar proyecto Node.js + Express | (infra) | 1 | Pendiente | `[completar-link]` |
| CU-1.1.2 | Configurar Sequelize + MySQL | (infra) | 1 | Pendiente | `[completar-link]` |
| CU-1.1.3 | Configurar motor EJS | (infra) | 1 | Pendiente | `[completar-link]` |
| CU-1.1.4 | Configurar middlewares base | (infra) | 1 | Pendiente | `[completar-link]` |
| CU-1.2.1 | Estructura del proyecto frontend (HTML/CSS/JS vanilla) | (infra) | 1 | Pendiente | `[completar-link]` |
| CU-1.2.2 | Branding global (logo, favicon, nombres) | (obligatorio) | 1 | Pendiente | `[completar-link]` |
| CU-1.2.3 | Sistema de temas claro/oscuro | (obligatorio) | 1 | Pendiente | `[completar-link]` |
| CU-1.2.4 | Barra de navegación persistente | (obligatorio) | 1 | Pendiente | `[completar-link]` |
| CU-1.3.1 | Dockerfile del backend | (infra) | 1 | Pendiente | `[completar-link]` |
| CU-1.3.2 | Dockerfile del frontend (nginx) | (infra) | 1 | Pendiente | `[completar-link]` |
| CU-1.3.3 | docker-compose.yml con mysql + backend + frontend | (infra) | 1 | Pendiente | `[completar-link]` |
| CU-1.3.4 | Variables de entorno y `.env.example` | (infra) | 1 | Pendiente | `[completar-link]` |
| CU-2.1.1 | Modelo Categoria | (obligatorio) | 1 | Pendiente | `[completar-link]` |
| CU-2.1.2 | Modelo Producto | (obligatorio) | 1 | Pendiente | `[completar-link]` |
| CU-2.1.3 | Modelo Usuario | (obligatorio) | 1 | Pendiente | `[completar-link]` |
| CU-2.1.4 | Modelo Venta | (obligatorio) | 1 | Pendiente | `[completar-link]` |
| CU-2.1.5 | Modelo VentaProducto | (obligatorio) | 1 | Pendiente | `[completar-link]` |
| CU-2.1.6 | Modelo Encuesta | (final) | 5 | Pendiente | `[completar-link]` |
| CU-2.1.7 | Modelo LogLogin | (final) | 5 | Pendiente | `[completar-link]` |
| CU-2.2.1 | Seed de categorías | (obligatorio) | 1 | Pendiente | `[completar-link]` |
| CU-2.2.2 | Seed de productos | (obligatorio) | 1 | Pendiente | `[completar-link]` |
| CU-2.2.3 | Seed de admin de prueba | (obligatorio) | 1 | Pendiente | `[completar-link]` |
| CU-3.1.1 | Listar productos paginados | (obligatorio) | 2 | Pendiente | `[completar-link]` |
| CU-3.1.2 | Obtener producto por ID | (obligatorio) | 2 | Pendiente | `[completar-link]` |
| CU-3.1.3 | Listar categorías | (obligatorio) | 2 | Pendiente | `[completar-link]` |
| CU-3.2.1 | Alta de producto con imagen | (obligatorio) | 2 | Pendiente | `[completar-link]` |
| CU-3.2.2 | Modificación de producto | (obligatorio) | 2 | Pendiente | `[completar-link]` |
| CU-3.2.3 | Baja lógica de producto | (obligatorio) | 2 | Pendiente | `[completar-link]` |
| CU-3.2.4 | Reactivación de producto | (obligatorio) | 2 | Pendiente | `[completar-link]` |
| CU-3.3.1 | Middleware validación de productos | (obligatorio) | 2 | Pendiente | `[completar-link]` |
| CU-3.3.2 | Middleware validación de imagen | (obligatorio) | 2 | Pendiente | `[completar-link]` |
| CU-4.1.1 | Endpoint registro de admin | (obligatorio) | 2 | Pendiente | `[completar-link]` |
| CU-4.2.1 | Login vía API | (obligatorio) | 2 | Pendiente | `[completar-link]` |
| CU-4.2.2 | Login vía vista EJS | (obligatorio) | 2 | Pendiente | `[completar-link]` |
| CU-4.2.3 | Botón de acceso rápido | (obligatorio) | 2 | Pendiente | `[completar-link]` |
| CU-4.2.4 | Middleware de autenticación | (obligatorio) | 2 | Pendiente | `[completar-link]` |
| CU-4.2.5 | Logout | (obligatorio) | 2 | Pendiente | `[completar-link]` |
| CU-5.1.1 | Pantalla bienvenida con nombre | (obligatorio) | 3 | Pendiente | `[completar-link]` |
| CU-5.2.1 | Visualización por categorías | (obligatorio) | 3 | Pendiente | `[completar-link]` |
| CU-5.2.2 | Paginación de productos | (obligatorio) | 3 | Pendiente | `[completar-link]` |
| CU-5.2.3 | Diseño responsive | (obligatorio) | 3 | Pendiente | `[completar-link]` |
| CU-5.2.4 | Agregar producto al carrito | (obligatorio) | 3 | Pendiente | `[completar-link]` |
| CU-5.2.5 | Quitar producto desde productos | (obligatorio) | 3 | Pendiente | `[completar-link]` |
| CU-5.2.6 | Indicador de items en carrito | (obligatorio) | 3 | Pendiente | `[completar-link]` |
| CU-5.3.1 | Listado de productos en carrito | (obligatorio) | 3 | Pendiente | `[completar-link]` |
| CU-5.3.2 | Modificar cantidades en carrito | (obligatorio) | 3 | Pendiente | `[completar-link]` |
| CU-5.3.3 | Eliminar producto del carrito | (obligatorio) | 3 | Pendiente | `[completar-link]` |
| CU-5.3.4 | Modal de confirmación de compra | (obligatorio) | 3 | Pendiente | `[completar-link]` |
| CU-5.3.5 | POST de venta al backend | (obligatorio) | 3 | Pendiente | `[completar-link]` |
| CU-5.4.1 | Mostrar ticket | (obligatorio) | 3 | Pendiente | `[completar-link]` |
| CU-5.4.2 | Descargar ticket en PDF | (obligatorio) | 3 | Pendiente | `[completar-link]` |
| CU-5.4.3 | Botón reiniciar (autoservicio) | (obligatorio) | 3 | Pendiente | `[completar-link]` |
| CU-6.1.1 | Dashboard listado de productos | (obligatorio) | 4 | Pendiente | `[completar-link]` |
| CU-6.1.2 | Acciones por producto en dashboard | (obligatorio) | 4 | Pendiente | `[completar-link]` |
| CU-6.1.3 | Botón agregar producto | (obligatorio) | 4 | Pendiente | `[completar-link]` |
| CU-6.1.4 | Botón descargar ventas Excel | (obligatorio) | 4 | Pendiente | `[completar-link]` |
| CU-6.1.5 | Botón ver registros | (final) | 5 | Pendiente | `[completar-link]` |
| CU-6.2.1 | Pantalla alta de producto | (obligatorio) | 4 | Pendiente | `[completar-link]` |
| CU-6.2.2 | Pantalla edición (reutiliza alta) | (obligatorio) | 4 | Pendiente | `[completar-link]` |
| CU-6.2.3 | Modales de confirmación baja/alta | (obligatorio) | 4 | Pendiente | `[completar-link]` |
| CU-7.1.1 | Generar Excel de ventas | (obligatorio) | 4 | Pendiente | `[completar-link]` |
| CU-7.1.2 | API listado de ventas con productos | (obligatorio) | 4 | Pendiente | `[completar-link]` |
| CU-7.2.1 | Generar Excel de encuestas | (final) | 5 | Pendiente | `[completar-link]` |
| CU-8.1.1 | Redirigir desde ticket a encuesta | (final) | 5 | Pendiente | `[completar-link]` |
| CU-8.1.2 | Formulario 5 tipos de input | (final) | 5 | Pendiente | `[completar-link]` |
| CU-8.1.3 | Validaciones de encuesta | (final) | 5 | Pendiente | `[completar-link]` |
| CU-8.1.4 | Upload imagen de encuesta | (final) | 5 | Pendiente | `[completar-link]` |
| CU-8.1.5 | Botón omitir encuesta | (final) | 5 | Pendiente | `[completar-link]` |
| CU-8.1.6 | Modal agradecimiento | (final) | 5 | Pendiente | `[completar-link]` |
| CU-8.2.1 | Ruta detalle de producto | (final) | 5 | Pendiente | `[completar-link]` |
| CU-8.2.2 | Agregar al carrito desde detalle | (final) | 5 | Pendiente | `[completar-link]` |
| CU-9.1.1 | Registrar intentos de login | (final) | 5 | Pendiente | `[completar-link]` |
| CU-9.1.2 | Vista de logs en panel | (final) | 5 | Pendiente | `[completar-link]` |
| CU-9.2.1 | Top 10 productos más vendidos | (final) | 5 | Pendiente | `[completar-link]` |
| CU-9.2.2 | Top 10 ventas más caras | (final) | 5 | Pendiente | `[completar-link]` |
| CU-9.2.3 | Estadística extra ventas por categoría | (final) | 5 | Pendiente | `[completar-link]` |
| CU-9.2.4 | Estadística extra puntuación promedio | (final) | 5 | Pendiente | `[completar-link]` |
| CU-10.1.1 | Diseño responsive en todas pantallas | (obligatorio) | 5 | Pendiente | `[completar-link]` |
| CU-10.1.2 | Criterio estético consistente | (obligatorio) | 5 | Pendiente | `[completar-link]` |
| CU-10.2.1 | README de cada repo | (infra) | 5 | Pendiente | `[completar-link]` |
| CU-10.2.2 | Colección de Postman | (infra) | 5 | Pendiente | `[completar-link]` |
| CU-10.3.1 | Repositorios separados | (infra) | 1 | Pendiente | `[completar-link]` |
| CU-10.3.2 | Commits balanceados | (infra) | continuo | Pendiente | `[completar-link]` |
| CU-10.3.3 | Branching y PRs | (infra) | continuo | Pendiente | `[completar-link]` |

---

# ÉPICA 1: Setup e infraestructura

## CU-1.1.1 — Inicializar proyecto Node.js + Express

**Consigna del enunciado:**
> "Configurar un servidor en Node.js utilizando Express para manejar las solicitudes y respuestas del sitio web front-end." *(Sección 5)*

**Caso de uso:**
Inicializar el proyecto backend con `npm init`, instalar Express y dependencias base. Crear estructura MVC de carpetas (`/models`, `/controllers`, `/services`, `/routes`, `/middlewares`, `/views`, `/public`, `/uploads`).

**Por qué:**
Es la base sobre la que se construye todo el backend. Sin esto, ninguno de los siguientes CU se puede empezar. Estructura MVC porque el enunciado pide explícitamente "rutas y endpoints bien estructurados y de forma lógica (MVC)".

**Tracking:**
- GitHub: `[completar-link]`
- Sprint: 1 | Estado: Pendiente

---

## CU-1.1.2 — Configurar Sequelize + MySQL

**Consigna del enunciado:**
> "API Rest → conectada BD MySQL → Proveer datos" *(sketch original)*
> "Utilizar un ORM." *(Sección 5.2)*

**Caso de uso:**
Instalar Sequelize y mysql2. Crear archivo de conexión en `/config/database.js`. Probar conexión al arrancar la app y mostrar mensaje claro si falla.

**Por qué:**
El enunciado obliga al uso de un ORM. Sequelize es el más maduro del ecosistema Node y soporta MySQL nativamente. Cubre además la prevención de SQL injection (RNF-SEC-04).

**Tracking:**
- GitHub: `[completar-link]`
- Sprint: 1 | Estado: Pendiente

---

## CU-1.1.3 — Configurar motor de vistas EJS

**Consigna del enunciado:**
> "Una parte con renderizado de vistas HTML (EJS) para los administradores a modo de back office" *(Sección 1)*
> "La devolución de mensajes debe ser mixta, basada en plantillas HTML (EJS) y en JSON." *(Sección 5)*

**Caso de uso:**
Instalar EJS, configurar `app.set('view engine', 'ejs')`. Crear layout base con header/nav/footer reutilizable. Configurar `/public` para assets estáticos.

**Por qué:**
El enunciado exige EJS explícitamente para el backoffice. El layout reutilizable evita duplicación de código en cada vista del admin.

**Tracking:**
- GitHub: `[completar-link]`
- Sprint: 1 | Estado: Pendiente

---

## CU-1.1.4 — Configurar middlewares base

**Consigna del enunciado:**
> *Decisión técnica derivada de los RF de validación, uploads y autenticación.*

**Caso de uso:**
Configurar `express.json()`, `express.urlencoded()`, `cors`, manejo de errores centralizado, sesión/JWT y multer (configurado en CU específico).

**Por qué:**
Estos middlewares son la base sobre la que se construyen las features de seguridad, validación y comunicación con el frontend.

**Tracking:**
- GitHub: `[completar-link]`
- Sprint: 1 | Estado: Pendiente

---

## CU-1.2.1 — Estructura del proyecto frontend (HTML/CSS/JS vanilla)

**Consigna del enunciado:**
> "Una aplicación frontend, la cual permite a los usuarios comprar distintas variantes de DOS tipos de productos a modo de autoservicio." *(Sección 1)*
> "Las vistas HTML del sistema deben poder ser navegables entre distintos archivos html a través de botones." *(Sección 1)*

**Caso de uso:**
Crear proyecto frontend como archivos estáticos: `frontend/public/` con un `.html` por pantalla (`index.html`, `productos.html`, `carrito.html`, `ticket.html`, `encuesta.html`, `producto-detalle.html`), `frontend/public/css/` con CSS plano (`base.css`, `components.css`, `theme.css`), `frontend/public/js/` con módulos compartidos (`api.js`, `carrito.js`, `tema.js`, `nav.js`) y un JS por página. `frontend/package.json` mínimo solo con `vitest` y `jsdom` para tests.

**Por qué:**
La cursada de Programación III solo cubre HTML, CSS y JavaScript vanilla — no se ve ningún framework de UI. Multi-página también es lo que pide el enunciado explícitamente ("las vistas HTML deben poder ser navegables entre distintos archivos html"). Al ser estáticos, los sirve nginx directamente sin build step.

**Tracking:**
- GitHub: `[completar-link]`
- Sprint: 1 | Estado: Pendiente

---

## CU-1.2.2 — Branding global

**Consigna del enunciado:**
> "TODAS las pantallas deben poseer: 1. Logo de la aplicación, 2. Nombre de la aplicación, 3. Nombre de los alumnos, 4. Barra de navegación." *(Sección 2)*
> "El sistema debe contar con un nombre de empresa / imagen de empresa. Se pide que las aplicaciones front-end cuenten con un favicon." *(Sección 4)*

**Caso de uso:**
Definir nombre comercial (ej: "AutoLavado Express"), crear logo SVG, configurar favicon. Componente global de header con logo + nombre + nombres de integrantes que se renderiza en todas las pantallas.

**Por qué:**
Es un requerimiento literal del enunciado: si una sola pantalla no tiene los 4 elementos, se considera incumplido. El componente global garantiza que aparezca en todas.

**Tracking:**
- GitHub: `[completar-link]`
- Sprint: 1 | Estado: Pendiente

---

## CU-1.2.3 — Sistema de temas claro/oscuro

**Consigna del enunciado:**
> "El sistema debe permitir cambiar el tema de la aplicación (al menos dos, claro y oscuro). Además de mantener el tema elegido si se recarga la página." *(Sección 4)*

**Caso de uso:**
Variables CSS para todos los colores. Toggle en header. Persistir elección en localStorage. Aplicar tema en el primer render basándose en lo guardado.

**Por qué:**
Persistencia es requisito explícito ("mantener el tema elegido si se recarga la página"). Variables CSS permiten cambiar todo el tema modificando solo el `:root` o agregando una clase al `<body>`.

**Tracking:**
- GitHub: `[completar-link]`
- Sprint: 1 | Estado: Pendiente

---

## CU-1.2.4 — Barra de navegación persistente

**Consigna del enunciado:**
> "Las vistas HTML del sistema deben poder ser navegables entre distintos archivos html a través de botones. La navegación a través de botones debe estar siempre disponible. El cliente NO debe tener que escribir una ruta a mano." *(Sección 1)*
> "Barra de navegación (debe poder navegar a las páginas disponibles dependiendo en dónde se esté)." *(Sección 2)*

**Caso de uso:**
Header con barra de navegación incluido en TODOS los `.html` (vía include manual o función JS de `nav.js` que inyecta el HTML del header al cargar la página). Links `<a href="otra.html">` contextuales según la pantalla actual. Botón de acceso al login admin siempre visible.

**Por qué:**
Si el cliente queda sin forma de navegar (ej: queda atrapado en una pantalla), se incumple el requisito. Como no hay un framework que comparta layout entre páginas, hay que asegurar el header esté en todos los HTML — un módulo JS compartido (`nav.js`) que renderice el header al cargar la página evita errores de copy/paste.

**Tracking:**
- GitHub: `[completar-link]`
- Sprint: 1 | Estado: Pendiente

---

## CU-1.3.1 — Dockerfile del backend

**Consigna del enunciado:**
> *Decisión técnica derivada de RNF-PORT-01 (correrse en cualquier máquina sin instalar dependencias).*

**Caso de uso:**
Dockerfile en `backend/` basado en `node:18-alpine`. Copia `package.json`, instala dependencias con `npm install --omit=dev`, copia `src/` y `seeders/`, expone puerto 3000, CMD `node src/app.js`.

**Por qué:**
La imagen alpine pesa < 50 MB. `--omit=dev` deja afuera vitest y supertest del contenedor de producción. El backend dockerizado permite que el tester levante todo con `docker-compose up` sin instalar Node localmente.

**Tracking:**
- GitHub: `[completar-link]`
- Sprint: 1 | Estado: Pendiente

---

## CU-1.3.2 — Dockerfile del frontend (nginx)

**Consigna del enunciado:**
> *Decisión técnica derivada de RNF-PORT-01.*

**Caso de uso:**
Dockerfile en `frontend/` basado en `nginx:alpine`. Copia el contenido de `frontend/public/` a `/usr/share/nginx/html`. Expone puerto 80 (mapeado a 8080 en el host).

**Por qué:**
Como el frontend es HTML+CSS+JS vanilla sin build step, alcanza con un servidor de estáticos. nginx alpine pesa < 10 MB. No necesita configuración custom — el default sirve los `.html` correctamente.

**Tracking:**
- GitHub: `[completar-link]`
- Sprint: 1 | Estado: Pendiente

---

## CU-1.3.3 — docker-compose.yml con mysql + backend + frontend

**Consigna del enunciado:**
> *Decisión técnica derivada de RNF-PORT-01.*

**Caso de uso:**
Archivo `docker-compose.yml` en la raíz del proyecto con tres servicios:
- `mysql` (imagen `mysql:8`) con volume `mysql_data` para persistencia, env vars `MYSQL_ROOT_PASSWORD`, `MYSQL_DATABASE=lavadero_db`
- `backend` (build desde `./backend`) con `depends_on: mysql`, mapea puerto 3000 al host, monta `./backend/uploads` como volume para que las imágenes sobrevivan reinicios del contenedor
- `frontend` (build desde `./frontend`) que mapea el puerto 80 del contenedor al 8080 del host

**Por qué:**
Un solo `docker-compose up` levanta toda la stack. El volume de MySQL evita perder los datos al apagar; el volume de uploads evita perder las imágenes de productos. `depends_on` garantiza que el backend no arranque antes que MySQL esté disponible.

**Tracking:**
- GitHub: `[completar-link]`
- Sprint: 1 | Estado: Pendiente

---

## CU-1.3.4 — Variables de entorno y `.env.example`

**Consigna del enunciado:**
> *Decisión técnica derivada de RNF-MNT-03 (no hardcodear configuraciones).*

**Caso de uso:**
Archivo `backend/.env.example` versionado con la estructura:
```
DB_HOST=mysql
DB_PORT=3306
DB_USER=root
DB_PASSWORD=lavadero123
DB_NAME=lavadero_db
PORT=3000
FRONTEND_URL=http://localhost:8080
SESSION_SECRET=cambiar-en-produccion
```
El `.env` real está en `.gitignore`. El frontend NO necesita `.env` — la URL del backend se hardcodea en `js/api.js` como `http://localhost:3000/api` porque el navegador del cliente le pega al host (no al hostname interno del compose).

**Por qué:**
`DB_HOST=mysql` (el nombre del servicio del compose) permite que el backend resuelva la BD por DNS interno de Docker. El `.env.example` documenta la estructura sin filtrar credenciales reales.

**Tracking:**
- GitHub: `[completar-link]`
- Sprint: 1 | Estado: Pendiente

---

# ÉPICA 2: Modelo de datos

## CU-2.1.1 — Modelo Categoria

**Consigna del enunciado:**
> "se deben poder visualizar los productos de la aplicación, divididos en categorías (dos categorías como fue mencionado anteriormente)" *(Sección 2)*

**Caso de uso:**
Modelo Sequelize Categoria con id, nombre, descripcion. Relación 1:N con Producto.

**Por qué:**
Modelar como tabla en lugar de ENUM permite agregar una tercera categoría sin migración de schema si el profe lo pide (el enunciado avisa que "dictarán cambios acordes y necesarios").

**Tracking:**
- GitHub: `[completar-link]`
- Sprint: 1 | Estado: Pendiente

---

## CU-2.1.2 — Modelo Producto

**Consigna del enunciado:**
> "Los productos mostrados deben ser los productos que estén activos en ese momento (el producto debe tener la propiedad booleana activo)." *(Sección 4)*
> "Debe permitir la carga de imágenes al dar el alta de un producto." *(Sección 5.2)*

**Caso de uso:**
Modelo Producto con id, nombre, descripcion, precio (DECIMAL), imagen (path), categoria_id (FK), activo (default true).

**Por qué:**
DECIMAL en lugar de FLOAT para precios (evita problemas de redondeo). La columna `imagen` guarda solo el path; el archivo en sí vive en `/uploads`. `activo` por default true porque el enunciado especifica que "los productos nuevos quedan activos por defecto".

**Tracking:**
- GitHub: `[completar-link]`
- Sprint: 1 | Estado: Pendiente

---

## CU-2.1.3 — Modelo Usuario

**Consigna del enunciado:**
> "El guardado de las contraseñas de los usuarios debe estar encriptado. NO se guardan contraseñas como vienen, se cifran antes de guardarlas." *(Sección 5.2)*

**Caso de uso:**
Modelo Usuario con id, nombre, email (único), password (hash), es_admin. Hook `beforeSave` que hashea password con bcrypt antes de persistirlo.

**Por qué:**
El hook automático garantiza que ningún flujo (ni el endpoint de registro, ni un seed, ni una migración) pueda guardar passwords en plano accidentalmente.

**Tracking:**
- GitHub: `[completar-link]`
- Sprint: 1 | Estado: Pendiente

---

## CU-2.1.4 — Modelo Venta

**Consigna del enunciado:**
> "El sistema debe poder persistir en la base de datos el registro de las ventas realizadas exitosamente, junto con el nombre del usuario que las efectuó, la fecha y el precio total." *(Sección 4)*

**Caso de uso:**
Modelo Venta con id, nombre_usuario (string libre), fecha, precio_total (DECIMAL).

**Por qué:**
`nombre_usuario` es string libre porque el cliente del autoservicio NO se loguea — solo escribe su nombre en la bienvenida. Guardar el `precio_total` calculado evita recalcularlo en cada consulta y mantiene consistencia histórica.

**Tracking:**
- GitHub: `[completar-link]`
- Sprint: 1 | Estado: Pendiente

---

## CU-2.1.5 — Modelo VentaProducto (pivot explícito)

**Consigna del enunciado:**
> "La tabla productos y la tabla ventas deben poseer una relación mucho a muchos." *(Sección 5.2)*
> "El sistema debe permitir comprar varios de un mismo producto (parámetro cantidad)." *(Sección 4)*

**Caso de uso:**
Modelo VentaProducto con id, venta_id, producto_id, cantidad, **precio_unitario** (snapshot al momento de la venta).

**Por qué:**
El precio se guarda como snapshot. Si el admin cambia el precio de un producto, los tickets anteriores no deben modificarse. Sin esta columna, los reportes históricos se rompen.

**Tracking:**
- GitHub: `[completar-link]`
- Sprint: 1 | Estado: Pendiente

---

## CU-2.1.6 — Modelo Encuesta (final)

**Consigna del enunciado:**
> "La pantalla encuesta debe permitir ingresar la opinión del consumidor. Debe contener al menos 5 tipos distintos de input: textarea, email, checkbox, slider y file." *(Requerimientos extra - Cliente)*

**Caso de uso:**
Modelo Encuesta con id, email, comentario, puntuacion (1-10), recomendaria (bool), imagen (path), fecha, venta_id (FK opcional).

**Por qué:**
`venta_id` es opcional porque se puede omitir la encuesta. Cuando se completa, sirve para correlacionar encuesta con su venta (estadísticas de satisfacción por monto, por ejemplo).

**Tracking:**
- GitHub: `[completar-link]`
- Sprint: 5 | Estado: Pendiente

---

## CU-2.1.7 — Modelo LogLogin (final)

**Consigna del enunciado:**
> "El sistema debe guardar registro a modo de LOG de cada vez que un usuario administrador inicia sesión." *(Requerimientos extra - Administrador)*

**Caso de uso:**
Modelo LogLogin con id, usuario_id (FK), fecha, exitoso (bool), ip.

**Por qué:**
Registrar también los intentos fallidos (no solo exitosos) da más valor a las estadísticas y permite detectar intentos de fuerza bruta. La `ip` ayuda en auditoría.

**Tracking:**
- GitHub: `[completar-link]`
- Sprint: 5 | Estado: Pendiente

---

## CU-2.2.1 — Seed de categorías

**Consigna del enunciado:**
> "La aplicación puede vender dos tipos de productos de cualquier tipo que deseen, pero deben pertenecer al mismo rubro." *(Sección 1)*

**Caso de uso:**
Seeder de Sequelize que inserta las categorías "Lavados" y "Accesorios".

**Por qué:**
Sin las categorías de base, no se pueden insertar productos. El seeder garantiza que cualquier persona que clone el repo tenga los datos iniciales.

**Tracking:**
- GitHub: `[completar-link]`
- Sprint: 1 | Estado: Pendiente

---

## CU-2.2.2 — Seed de productos

**Consigna del enunciado:**
> "El sistema debe tener cargados y mostrados productos variados para ambos tipos de productos al momento de ser probada por el cliente (los profesores evaluando)." *(Sección 4)*
> "Al momento de testear la aplicación, debe haber suficientes productos activos para poder ver todas las funcionalidades." *(Sección 4)*

**Caso de uso:**
Seeder con mínimo 10 productos activos (5 por categoría) para poder probar paginación y filtros. Productos sugeridos: 8 servicios de lavado + 8 accesorios.

**Por qué:**
El enunciado dice explícitamente "suficientes productos activos para ver todas las funcionalidades". Con menos de 8 por categoría no se puede demostrar paginación de 8 por página.

**Tracking:**
- GitHub: `[completar-link]`
- Sprint: 1 | Estado: Pendiente

---

## CU-2.2.3 — Seed de admin de prueba

**Consigna del enunciado:**
> "Dicho botón debe autocompletar los input del login (correo y contraseña) para facilitar el acceso a esta sección a los testers (los profesores)." *(Sección 5.1)*

**Caso de uso:**
Seeder que crea un usuario admin: `admin@lavadero.com` / `admin123`.

**Por qué:**
El botón de acceso rápido (CU-4.2.3) necesita credenciales reales. Estas credenciales deben estar documentadas en el README.

**Tracking:**
- GitHub: `[completar-link]`
- Sprint: 1 | Estado: Pendiente

---

# ÉPICA 3: API REST de productos

## CU-3.1.1 — Listar productos paginados

**Consigna del enunciado:**
> "Debe permitir traer los productos en forma de páginas (paginación)." *(Sección 5.2)*
> "El sistema debe poder paginar los productos para evitar que estén todos en pantalla al mismo tiempo." *(Sección 4)*

**Caso de uso:**
Endpoint `GET /api/productos?page=1&limit=8&categoria=&activo=`. Devuelve `{ data, pagination: { page, total, totalPages } }`.

**Por qué:**
La paginación se hace en backend con `LIMIT`/`OFFSET` (no en frontend) para no traer todos los productos en cada request. El filtro `activo` permite que el mismo endpoint sirva al cliente (solo activos) y al admin (todos).

**Tracking:**
- GitHub: `[completar-link]`
- Sprint: 2 | Estado: Pendiente

---

## CU-3.1.2 — Obtener producto por ID

**Consigna del enunciado:**
> "Se debe crear la pantalla detalle, que debe permitirle al cliente ver los detalles de un producto. Se debe tomar el id del producto desde los parámetros de la ruta para traer los datos." *(Requerimientos extra - Cliente)*

**Caso de uso:**
Endpoint `GET /api/productos/:id`. Devuelve 404 si no existe. Incluye datos de categoría asociada.

**Por qué:**
Soporta la pantalla de detalle del final, pero también es útil para el alta/edición (precargar datos).

**Tracking:**
- GitHub: `[completar-link]`
- Sprint: 2 | Estado: Pendiente

---

## CU-3.1.3 — Listar categorías

**Consigna del enunciado:**
> *Decisión técnica derivada de "divididos en categorías" (Sección 2).*

**Caso de uso:**
Endpoint `GET /api/categorias` que devuelve todas las categorías.

**Por qué:**
El frontend lo usa para armar las tabs de filtrado y el select del formulario de alta. Centralizar las categorías en BD permite agregarlas/modificarlas sin tocar código.

**Tracking:**
- GitHub: `[completar-link]`
- Sprint: 2 | Estado: Pendiente

---

## CU-3.2.1 — Alta de producto con imagen

**Consigna del enunciado:**
> "Debe permitir la carga de imágenes al dar el alta de un producto. Las imágenes se guardan en el servidor." *(Sección 5.2)*
> "El panel debe poder permitir agregar un nuevo producto a la base de datos. (activo por defecto)." *(Sección 5.1)*

**Caso de uso:**
Endpoint `POST /api/productos` con multipart/form-data. Multer guarda imagen en `/uploads` con nombre único. Validaciones vía middleware (CU-3.3.1, CU-3.3.2). Producto creado con `activo=true`.

**Por qué:**
El nombre único de archivo previene colisiones (timestamp + random). Almacenar en filesystem es lo que pide el enunciado ("se guardan en el servidor"), no en BD.

**Tracking:**
- GitHub: `[completar-link]`
- Sprint: 2 | Estado: Pendiente

---

## CU-3.2.2 — Modificación de producto

**Consigna del enunciado:**
> "Modificar el producto (nombre, precio, imagen)." *(Sección 5.1)*
> "Pantalla Modificar producto. Debe permitir modificar todos los datos de un producto a través de su ID." *(Sección 2)*

**Caso de uso:**
Endpoint `PUT /api/productos/:id`. Imagen opcional: si no se envía, se mantiene la anterior. Si se envía nueva, eliminar la anterior del disco.

**Por qué:**
La imagen opcional permite editar otros datos sin tener que volver a subir la imagen. Eliminar la imagen vieja del disco previene basura acumulada.

**Tracking:**
- GitHub: `[completar-link]`
- Sprint: 2 | Estado: Pendiente

---

## CU-3.2.3 — Baja lógica de producto

**Consigna del enunciado:**
> "Desactivar el producto (baja lógica → cambiar el valor de activo a false)." *(Sección 5.1)*
> "El producto eliminado pasa a mostrarse en estado inactivo (baja lógica). Nota: En este momento, no debería poder verse dicho producto del lado del cliente." *(Flujo admin)*

**Caso de uso:**
Endpoint `PATCH /api/productos/:id/desactivar`. Solo cambia `activo=false`. El producto NO se elimina de la BD.

**Por qué:**
Baja lógica preserva la integridad de las ventas históricas. Si se hiciera baja física, las ventas asociadas quedarían huérfanas o requerirían CASCADE (perdiendo el historial).

**Tracking:**
- GitHub: `[completar-link]`
- Sprint: 2 | Estado: Pendiente

---

## CU-3.2.4 — Reactivación de producto

**Consigna del enunciado:**
> "Reactivar el producto (cambiar el valor de activo a true)." *(Sección 5.1)*

**Caso de uso:**
Endpoint `PATCH /api/productos/:id/activar`. Cambia `activo=true`.

**Por qué:**
Es la operación inversa a la baja lógica. Necesaria para el flujo del admin (puntos 19-21 del flujo del enunciado).

**Tracking:**
- GitHub: `[completar-link]`
- Sprint: 2 | Estado: Pendiente

---

## CU-3.3.1 — Middleware de validación de productos

**Consigna del enunciado:**
> "Debe validar todos los datos que recibe a través de middlewares." *(Sección 5.2)*

**Caso de uso:**
Middleware con express-validator. Valida nombre (mín 3 chars), precio (decimal > 0), categoria_id (existe en BD), descripcion (opcional). Devuelve errores en formato JSON estandarizado.

**Por qué:**
Centralizar validaciones en middlewares evita duplicarlas en cada controller y deja el código de los controllers limpio (single responsibility).

**Tracking:**
- GitHub: `[completar-link]`
- Sprint: 2 | Estado: Pendiente

---

## CU-3.3.2 — Middleware de validación de imagen

**Consigna del enunciado:**
> *Decisión técnica derivada del RF de upload + RNF de seguridad.*

**Caso de uso:**
Middleware de multer con `fileFilter` que valida MIME (jpg, png, webp) y `limits.fileSize` de 2MB.

**Por qué:**
Sin validación, un atacante podría subir archivos ejecutables o imágenes gigantes que llenen el disco. Es defensa en profundidad.

**Tracking:**
- GitHub: `[completar-link]`
- Sprint: 2 | Estado: Pendiente

---

# ÉPICA 4: Autenticación

## CU-4.1.1 — Endpoint registro de admin

**Consigna del enunciado:**
> "La creación de un usuario administrador se realiza a través de un endpoint de la API." *(Sección 5.2)*

**Caso de uso:**
Endpoint `POST /api/auth/registro-admin`. Recibe nombre, email, password. Valida email único. `es_admin=true` por default.

**Por qué:**
El enunciado obliga a que la creación sea vía API (no por seed o panel). Esto demuestra que se entiende el flujo de creación segura de usuarios.

**Tracking:**
- GitHub: `[completar-link]`
- Sprint: 2 | Estado: Pendiente

---

## CU-4.2.1 — Login vía API

**Consigna del enunciado:**
> "El login debe funcionar obteniendo los datos del usuario de la base de datos." *(Sección 5.1)*

**Caso de uso:**
Endpoint `POST /api/auth/login`. Verifica hash con bcrypt. Devuelve token JWT o setea cookie. En error devuelve 401 genérico (sin revelar si el email existe).

**Por qué:**
No revelar si el email existe previene enumeración de usuarios. El 401 genérico es práctica estándar de seguridad.

**Tracking:**
- GitHub: `[completar-link]`
- Sprint: 2 | Estado: Pendiente

---

## CU-4.2.2 — Login vía vista EJS

**Consigna del enunciado:**
> "El sistema debe mostrar una pantalla login al momento de acceder." *(Sección 5.1)*
> "Una vez se realiza el login, se redirige a la página que contendrá el panel de administrador." *(Sección 5.1)*

**Caso de uso:**
Rutas `GET /admin/login` (renderiza form) y `POST /admin/login` (procesa). En éxito redirige a `/admin/dashboard`. En error muestra mensaje en la misma vista.

**Por qué:**
El backoffice es server-rendered, por eso el form se procesa en backend (no llamada AJAX). express-session maneja la sesión.

**Tracking:**
- GitHub: `[completar-link]`
- Sprint: 2 | Estado: Pendiente

---

## CU-4.2.3 — Botón de acceso rápido

**Consigna del enunciado:**
> "El login debe poseer un botón de acceso rápido. Dicho botón debe autocompletar los input del login (correo y contraseña) para facilitar el acceso a esta sección a los testers (los profesores)." *(Sección 5.1)*
> "el uso de botones de acceso rápido es una feature muy importante para que los clientes puedan probar nuestras aplicaciones de forma rápida y eficaz." *(Sección 5.1)*

**Caso de uso:**
Botón visible en pantalla de login. Al hacer click, autocompleta los inputs con `admin@lavadero.com` / `admin123` (las credenciales del seed).

**Por qué:**
Es requerimiento explícito y el enunciado lo destaca como "feature muy importante". Si falta, el profe va a tener que tipear credenciales en cada testing.

**Tracking:**
- GitHub: `[completar-link]`
- Sprint: 2 | Estado: Pendiente

---

## CU-4.2.4 — Middleware de autenticación

**Consigna del enunciado:**
> *Decisión técnica derivada del RF de login + RNF de seguridad.*

**Caso de uso:**
Middleware que verifica sesión o JWT en rutas protegidas. Redirige a `/admin/login` si no autenticado en vistas EJS, o devuelve 401 si es endpoint de API.

**Por qué:**
Sin este middleware, cualquiera podría acceder al dashboard escribiendo la URL directamente. Centralizar la lógica de auth evita olvidos.

**Tracking:**
- GitHub: `[completar-link]`
- Sprint: 2 | Estado: Pendiente

---

## CU-4.2.5 — Logout

**Consigna del enunciado:**
> *Decisión técnica derivada del flujo del admin.*

**Caso de uso:**
Endpoint `POST /admin/logout` que destruye la sesión y redirige a pantalla pública.

**Por qué:**
Sin logout, el admin queda logueado indefinidamente. Necesario para demos donde se prueba el flujo desde cero.

**Tracking:**
- GitHub: `[completar-link]`
- Sprint: 2 | Estado: Pendiente

---

# ÉPICA 5: Flujo del cliente

## CU-5.1.1 — Pantalla bienvenida con nombre

**Consigna del enunciado:**
> "Pantalla de bienvenida. En esta pantalla el cliente podrá ingresar su nombre antes de poder continuar a ver los productos." *(Sección 2)*
> "El sistema debe preguntar su nombre al usuario al comenzar, sólo cuando se complete, se permitirá ver los productos para comprar." *(Sección 4)*

**Caso de uso:**
Input obligatorio (mín 2 chars). Botón "Continuar" deshabilitado si está vacío. Persistir nombre en `sessionStorage` con la clave `clienteNombre`. En cada pantalla del flujo, si no hay nombre en sessionStorage, redirigir a `index.html`.

**Por qué:**
El nombre se usa después en el ticket y en la venta persistida. `sessionStorage` (no localStorage) porque al cerrar la pestaña debe limpiarse — es autoservicio. Centralizar la lectura en `carrito.js` o módulo similar evita duplicación.

**Tracking:**
- GitHub: `[completar-link]`
- Sprint: 3 | Estado: Pendiente

---

## CU-5.2.1 — Visualización de productos por categorías

**Consigna del enunciado:**
> "Pantalla de productos. En esta pantalla se deben poder visualizar los productos de la aplicación, divididos en categorías (dos categorías como fue mencionado anteriormente), los productos deben mostrar todos sus datos e imagen, a la vez que la capacidad para agregarlos o quitarlos del carrito." *(Sección 2)*

**Caso de uso:**
Tabs o filtros para alternar entre "Lavados" y "Accesorios". Mostrar nombre, imagen, descripción y precio. Solo productos activos.

**Por qué:**
Tabs es más intuitivo en mobile que select. Filtrar por `activo=true` desde la API en lugar del frontend reduce datos transferidos.

**Tracking:**
- GitHub: `[completar-link]`
- Sprint: 3 | Estado: Pendiente

---

## CU-5.2.2 — Paginación de productos

**Consigna del enunciado:**
> "Deben estar pensados para 1- mostrarse de forma responsive. 2- mostrarse de forma paginada." *(Sección 4)*

**Caso de uso:**
Mostrar máximo 8 productos por página. Controles de página anterior/siguiente. Indicador de página actual.

**Por qué:**
8 productos entra cómodo en una grilla de 4x2 en desktop y 1 columna scrolleable en mobile. Más de eso satura visualmente.

**Tracking:**
- GitHub: `[completar-link]`
- Sprint: 3 | Estado: Pendiente

---

## CU-5.2.3 — Diseño responsive

**Consigna del enunciado:**
> "La empresa necesita que la aplicación pueda ser vista tanto en computadoras como en teléfonos móviles (RESPONSIVE)." *(Sección 1)*

**Caso de uso:**
Mobile-first. Breakpoints: 1 col mobile (<768px), 2 col tablet (768-1024px), 3-4 col desktop. Sin scroll horizontal en ninguna resolución.

**Por qué:**
Mobile-first asegura que el caso más restrictivo (pantalla chica) se resuelva primero. El enunciado pide responsive como requerimiento explícito.

**Tracking:**
- GitHub: `[completar-link]`
- Sprint: 3 | Estado: Pendiente

---

## CU-5.2.4 — Agregar producto al carrito

**Consigna del enunciado:**
> "El cliente agrega un producto al carrito." *(Flujo cliente, paso 7)*
> "El cliente agrega varios productos al carrito al mismo tiempo." *(Flujo cliente, paso 8)*

**Caso de uso:**
Botón "+" o "Agregar" en cada card de producto. Si ya está en el carrito, suma cantidad. Toast de confirmación al agregar.

**Por qué:**
El feedback visual (toast) reduce la incertidumbre del usuario sobre si el click hizo algo.

**Tracking:**
- GitHub: `[completar-link]`
- Sprint: 3 | Estado: Pendiente

---

## CU-5.2.5 — Quitar producto desde pantalla de productos

**Consigna del enunciado:**
> "El cliente elimina un producto del carrito." *(Flujo cliente, paso 9)*
> "la capacidad para agregarlos o quitarlos del carrito" *(Sección 2)*

**Caso de uso:**
Si un producto ya está en el carrito, mostrar también botón "-" en la card. Al llegar a 0, se elimina del carrito.

**Por qué:**
El flujo del enunciado especifica que se pueden quitar productos. Permitir hacerlo desde la lista de productos (no solo desde el carrito) reduce fricción.

**Tracking:**
- GitHub: `[completar-link]`
- Sprint: 3 | Estado: Pendiente

---

## CU-5.2.6 — Indicador de items en carrito

**Consigna del enunciado:**
> *Decisión de UX para soportar los flujos de agregado/quitado.*

**Caso de uso:**
Badge en el ícono del carrito en el header, con cantidad total de items. Visible siempre.

**Por qué:**
Sin indicador, el cliente no sabe cuántos productos lleva sin entrar al carrito. Mejora la usabilidad significativamente.

**Tracking:**
- GitHub: `[completar-link]`
- Sprint: 3 | Estado: Pendiente

---

## CU-5.3.1 — Listado de productos en carrito

**Consigna del enunciado:**
> "Pantalla de carrito. En esta se debe ver el listado de productos que ya fueron añadidos al carrito" *(Sección 2)*

**Caso de uso:**
Mostrar cada producto con imagen, nombre, precio unitario, cantidad, subtotal. Mostrar total general. Si está vacío: mensaje + botón "ver productos".

**Por qué:**
El subtotal por línea ayuda al cliente a entender cómo se forma el total. El mensaje de carrito vacío previene confusión.

**Tracking:**
- GitHub: `[completar-link]`
- Sprint: 3 | Estado: Pendiente

---

## CU-5.3.2 — Modificar cantidades en carrito

**Consigna del enunciado:**
> "se debe poder agregar o quitar distintas cantidades de los productos seleccionados." *(Sección 2)*
> "El cliente agrega más cantidad de un producto ya agregado al carrito." *(Flujo cliente, paso 11)*
> "El cliente elimina una cantidad de un producto ya agregado." *(Flujo cliente, paso 12)*

**Caso de uso:**
Botones +/- por producto en la lista del carrito. Input numérico editable con validación de mínimo 1.

**Por qué:**
Los dos métodos (botones + input) cubren distintas preferencias de usuario y son ambos accesibles desde mobile.

**Tracking:**
- GitHub: `[completar-link]`
- Sprint: 3 | Estado: Pendiente

---

## CU-5.3.3 — Eliminar producto del carrito

**Consigna del enunciado:**
> "El sistema debe poder permitir eliminar productos que no se deseen comprar." *(Sección 4)*

**Caso de uso:**
Botón "Eliminar" en cada item del carrito. Sin modal de confirmación (es reversible volviendo a agregar desde productos).

**Por qué:**
Modal de confirmación para cada eliminación generaría fricción innecesaria. La acción es totalmente reversible.

**Tracking:**
- GitHub: `[completar-link]`
- Sprint: 3 | Estado: Pendiente

---

## CU-5.3.4 — Modal de confirmación de compra

**Consigna del enunciado:**
> "El sistema debe lanzar un modal que pregunte si el cliente quiere confirmar la compra." *(Sección 4)*

**Caso de uso:**
Botón "Finalizar compra" abre modal con resumen y pide confirmación. Botones "Confirmar" / "Cancelar".

**Por qué:**
Requerimiento literal del enunciado. La compra es la única acción no reversible en el flujo del cliente — la confirmación previene errores.

**Tracking:**
- GitHub: `[completar-link]`
- Sprint: 3 | Estado: Pendiente

---

## CU-5.3.5 — POST de venta al backend

**Consigna del enunciado:**
> "El sistema debe poder persistir en la base de datos el registro de las ventas realizadas exitosamente" *(Sección 4)*

**Caso de uso:**
Endpoint `POST /api/ventas` con payload `{ nombre_usuario, items: [{ producto_id, cantidad }] }`. **El total se calcula en backend**. Se crea Venta + VentaProducto en una transacción.

**Por qué:**
Calcular el total en backend previene manipulación desde el cliente. La transacción asegura atomicidad: si falla algo, no quedan datos parciales.

**Tracking:**
- GitHub: `[completar-link]`
- Sprint: 3 | Estado: Pendiente

---

## CU-5.4.1 — Mostrar ticket

**Consigna del enunciado:**
> "Pantalla de ticket. Una vez confirmado el carrito, se debe poder ver un ticket con los productos comprados, sus datos y el nombre del usuario." *(Sección 2)*
> "El ticket muestra los datos de los productos comprados, el nombre ingresado en el paso 2, la fecha de hoy y el nombre de la empresa." *(Flujo cliente, paso 14)*

**Caso de uso:**
Mostrar nombre de empresa, nombre del cliente, fecha, productos con cantidades y subtotales, total. Estilo de ticket con font monoespaciada.

**Por qué:**
El estilo "impreso" comunica visualmente que es un ticket de compra y no una pantalla cualquiera.

**Tracking:**
- GitHub: `[completar-link]`
- Sprint: 3 | Estado: Pendiente

---

## CU-5.4.2 — Descargar ticket en PDF

**Consigna del enunciado:**
> "El sistema debe permitir descargar el ticket en PDF." *(Sección 4)*

**Caso de uso:**
Botón "Descargar PDF" que genera el archivo en el cliente con jsPDF. Nombre del archivo: `ticket-{fecha}-{nombre}.pdf`.

**Por qué:**
Generar en cliente (no en backend) ahorra una request HTTP y permite ofrecer el PDF inmediatamente sin esperar.

**Tracking:**
- GitHub: `[completar-link]`
- Sprint: 3 | Estado: Pendiente

---

## CU-5.4.3 — Botón reiniciar (autoservicio)

**Consigna del enunciado:**
> "El cliente le da al botón de salir. El sistema vuelve a comenzar." *(Flujo cliente, pasos 15-16)*
> "El sistema debe mostrar un botón que permita volver a iniciar el proceso de compra al finalizar y mostrar el ticket. Nota: Recordar que una vez finalizada una compra y entregado el ticket, el sistema se reinicia. Esto es un autoservicio, NO un e-commerce." *(Sección 4)*

**Caso de uso:**
En cursada: botón "Salir" hace `sessionStorage.clear()` y `window.location.href = 'index.html'`. En final: el botón redirige a `encuesta.html` primero (que después de enviar vuelve a `index.html`).

**Por qué:**
El enunciado enfatiza que es autoservicio. `sessionStorage.clear()` borra el carrito y el nombre — si no, el próximo cliente vería el estado del anterior. Limpiar todo el sessionStorage (en vez de claves individuales) es más robusto a futuros agregados.

**Tracking:**
- GitHub: `[completar-link]`
- Sprint: 3 | Estado: Pendiente

---

# ÉPICA 6: Backoffice EJS

## CU-6.1.1 — Dashboard listado de productos

**Consigna del enunciado:**
> "Pantalla dashboard. Debe poseer el listado de productos, así como las acciones correspondientes para el alta, baja y modificación de los mismos." *(Sección 2)*
> "El panel de administrador debe mostrar los productos disponibles con sus detalles, separados por tipo." *(Sección 5.1)*

**Caso de uso:**
Tabla EJS con imagen, nombre, categoría, precio, estado. Productos separados visualmente por categoría. Productos inactivos con estilo diferenciado (color tenue o etiqueta).

**Por qué:**
Separación visual permite al admin ver rápido el inventario por tipo. El indicador de inactivo evita confundirlo con producto activo.

**Tracking:**
- GitHub: `[completar-link]`
- Sprint: 4 | Estado: Pendiente

---

## CU-6.1.2 — Acciones por producto en dashboard

**Consigna del enunciado:**
> "El panel debe poder permitir seleccionar un producto y: Modificar el producto / Desactivar el producto / Reactivar el producto." *(Sección 5.1)*

**Caso de uso:**
Botones "Editar", "Desactivar" (si activo) o "Activar" (si inactivo) por producto. "Desactivar" y "Activar" abren modal de confirmación.

**Por qué:**
Mostrar solo la acción aplicable (activar O desactivar, no ambas) reduce confusión y errores.

**Tracking:**
- GitHub: `[completar-link]`
- Sprint: 4 | Estado: Pendiente

---

## CU-6.1.3 — Botón agregar producto

**Consigna del enunciado:**
> "El administrador presiona el botón agregar producto. Se redirige a la pantalla de alta del producto." *(Flujo admin, pasos 6-7)*

**Caso de uso:**
Botón "Agregar producto" en dashboard que navega a `/admin/productos/alta`.

**Por qué:**
Pantalla separada (no modal) porque el enunciado dice "si se nombra como pantalla, debe ser una ruta distinta, no un modal" (Sección 2).

**Tracking:**
- GitHub: `[completar-link]`
- Sprint: 4 | Estado: Pendiente

---

## CU-6.1.4 — Botón descargar ventas en Excel

**Consigna del enunciado:**
> "El panel debe poseer un botón que permita descargar el listado de ventas en excel." *(Sección 5.1)*
> "El administrador descarga el excel con las ventas." *(Flujo admin, paso 22)*

**Caso de uso:**
Botón en dashboard que descarga archivo .xlsx con todas las ventas y sus productos asociados.

**Por qué:**
Excel es el formato estándar que conoce el cliente del enunciado ("una gran empresa"). xlsx con headers estilizados se ve profesional.

**Tracking:**
- GitHub: `[completar-link]`
- Sprint: 4 | Estado: Pendiente

---

## CU-6.1.5 — Botón ver registros (final)

**Consigna del enunciado:**
> "Se debe crear la pantalla registros." *(Requerimientos extra - Administrador)*

**Caso de uso:**
Botón "Ver registros" en dashboard que navega a `/admin/registros`.

**Por qué:**
Es la entrada al feature de estadísticas y logs del final.

**Tracking:**
- GitHub: `[completar-link]`
- Sprint: 5 | Estado: Pendiente

---

## CU-6.2.1 — Pantalla alta de producto

**Consigna del enunciado:**
> "Pantalla Alta de producto. Debe permitir cargar un nuevo producto con todos sus datos y su imagen." *(Sección 2)*

**Caso de uso:**
Formulario EJS con campos nombre, descripción, precio, categoría (select), imagen (file). Validación cliente (HTML5) y servidor. Botón "Agregar" hace POST y redirige a dashboard.

**Por qué:**
La doble validación (cliente para feedback inmediato, servidor para seguridad) es práctica estándar.

**Tracking:**
- GitHub: `[completar-link]`
- Sprint: 4 | Estado: Pendiente

---

## CU-6.2.2 — Pantalla edición (reutiliza alta)

**Consigna del enunciado:**
> "Pantalla Modificar producto. Debe permitir modificar todos los datos de un producto a través de su ID. Nota: se puede reutilizar la pantalla de alta." *(Sección 2)*

**Caso de uso:**
Misma vista que alta pero con datos precargados. Imagen actual visible, opción a reemplazarla. Botón cambia a "Guardar cambios".

**Por qué:**
Reutilizar la vista reduce duplicación de código y mantiene consistencia. El enunciado lo sugiere explícitamente.

**Tracking:**
- GitHub: `[completar-link]`
- Sprint: 4 | Estado: Pendiente

---

## CU-6.2.3 — Modales de confirmación baja/activación

**Consigna del enunciado:**
> "Se muestra un modal que pregunta si está seguro de eliminar. El administrador presiona el botón confirmar." *(Flujo admin, paso 12)*
> "Se muestra un modal que pregunta si está seguro de activar. El administrador presiona el botón confirmar." *(Flujo admin, paso 20)*

**Caso de uso:**
Modal con mensaje "¿Confirma desactivar el producto X?" o "¿Confirma activar el producto X?". Botones confirmar / cancelar.

**Por qué:**
Requerimiento literal del enunciado en ambos casos. Previene desactivaciones accidentales.

**Tracking:**
- GitHub: `[completar-link]`
- Sprint: 4 | Estado: Pendiente

---

# ÉPICA 7: Reportes

## CU-7.1.1 — Generar Excel de ventas

**Consigna del enunciado:**
> "El panel debe poseer un botón que permita descargar el listado de ventas en excel." *(Sección 5.1)*
> "Debe poder devolver el listado de ventas junto con los productos asociados a las mismas." *(Sección 5.2)*

**Caso de uso:**
Endpoint `GET /admin/ventas/excel`. Genera xlsx con exceljs. Columnas: ID, Cliente, Fecha, Total, Productos (concatenados con cantidades).

**Por qué:**
Concatenar productos en una sola columna evita filas duplicadas y mantiene el reporte legible.

**Tracking:**
- GitHub: `[completar-link]`
- Sprint: 4 | Estado: Pendiente

---

## CU-7.1.2 — API listado de ventas con productos

**Consigna del enunciado:**
> "Debe poder devolver el listado de ventas junto con los productos asociados a las mismas." *(Sección 5.2)*

**Caso de uso:**
Endpoint `GET /api/ventas`. Eager loading de productos asociados con `include`. Soporta paginación.

**Por qué:**
Eager loading evita el problema N+1 (una query por cada venta para traer sus productos). Es requerimiento explícito.

**Tracking:**
- GitHub: `[completar-link]`
- Sprint: 4 | Estado: Pendiente

---

## CU-7.2.1 — Generar Excel de encuestas (final)

**Consigna del enunciado:**
> "El administrador debe poder descargar los datos de las encuestas en Excel." *(Requerimientos extra - Administrador)*

**Caso de uso:**
Endpoint `GET /admin/encuestas/excel`. Columnas: ID, Email, Puntuación, Recomendaría, Comentario, Fecha.

**Por qué:**
Mismo patrón que el Excel de ventas. Permite al admin analizar el feedback en Excel offline.

**Tracking:**
- GitHub: `[completar-link]`
- Sprint: 5 | Estado: Pendiente

---

# ÉPICA 8: Encuestas y detalle (final) (final)

## CU-8.1.1 — Redirigir desde ticket a encuesta (final)

**Consigna del enunciado:**
> "Luego de ver el ticket y tocar el botón para salir, se redirige a la pantalla encuesta." *(Requerimientos extra - Cliente)*

**Caso de uso:**
En modo final, el botón "Salir" del ticket lleva a `/encuesta` en lugar de a bienvenida.

**Por qué:**
La encuesta es el último paso antes de reiniciar el flujo. Esto mantiene la continuidad del recorrido.

**Tracking:**
- GitHub: `[completar-link]`
- Sprint: 5 | Estado: Pendiente

---

## CU-8.1.2 — Formulario con 5 tipos de input (final)

**Consigna del enunciado:**
> "La pantalla encuesta debe permitir ingresar la opinión del consumidor. Debe contener al menos 5 tipos distintos de input: textarea, email, checkbox, slider y file." *(Requerimientos extra - Cliente)*
> "El input de tipo file debe ser una imagen que se guardará en el servidor." *(Requerimientos extra - Cliente)*
> "El input de tipo slider debe ser la puntuación que se le otorgó al servicio." *(Requerimientos extra - Cliente)*

**Caso de uso:**
Formulario con: textarea (comentario), email (contacto), checkbox (recomendaría), range/slider 1-10 (puntuación), file (foto opcional).

**Por qué:**
Cumple los 5 tipos obligatorios del enunciado. La foto es opcional para no forzar al cliente a subir algo si no quiere.

**Tracking:**
- GitHub: `[completar-link]`
- Sprint: 5 | Estado: Pendiente

---

## CU-8.1.3 — Validaciones de encuesta (final)

**Consigna del enunciado:**
> "Todos los datos deben estar validados. Se deben mostrar los mensajes correspondientes en caso de error." *(Requerimientos extra - Cliente)*

**Caso de uso:**
Validación de email con formato válido, comentario mín 10 chars si se completa, slider entre 1-10, imagen formato y tamaño válidos. Mensajes de error bajo cada campo.

**Por qué:**
Errores granulares por campo permiten al usuario corregir sin tener que adivinar qué está mal.

**Tracking:**
- GitHub: `[completar-link]`
- Sprint: 5 | Estado: Pendiente

---

## CU-8.1.4 — Upload imagen de encuesta (final)

**Consigna del enunciado:**
> "El input de tipo file debe ser una imagen que se guardará en el servidor." *(Requerimientos extra - Cliente)*

**Caso de uso:**
Endpoint `POST /api/encuestas` con multipart. Imagen guardada en `/uploads/encuestas`. Asociar path a la encuesta en BD.

**Por qué:**
Subdirectorio `/encuestas` separa estos uploads de los de productos. Facilita backups diferenciados y limpieza.

**Tracking:**
- GitHub: `[completar-link]`
- Sprint: 5 | Estado: Pendiente

---

## CU-8.1.5 — Botón omitir encuesta (final)

**Consigna del enunciado:**
> "Se debe permitir omitir la encuesta. El botón omitir debe ser visible pero no resaltar más que el resto de acciones en la pantalla." *(Requerimientos extra - Cliente)*

**Caso de uso:**
Botón "Omitir" con estilo secundario (gris/outline). Al hacer click, redirige a bienvenida sin guardar.

**Por qué:**
El estilo secundario respeta el requisito de que sea "visible pero no resaltar más". El usuario que quiere omitir lo encuentra pero no se siente empujado a hacerlo.

**Tracking:**
- GitHub: `[completar-link]`
- Sprint: 5 | Estado: Pendiente

---

## CU-8.1.6 — Modal de agradecimiento (final)

**Consigna del enunciado:**
> "Se debe mostrar un mensaje de agradecimiento en forma de modal al finalizar la encuesta correctamente. Se debe guardar la información en la BD junto con la fecha actual." *(Requerimientos extra - Cliente)*

**Caso de uso:**
Al enviar exitosamente, mostrar modal "Gracias por tu feedback". Botón "Volver al inicio". Persistir encuesta con fecha actual.

**Por qué:**
Cierra el ciclo de feedback de forma positiva. El usuario sabe que su input fue recibido.

**Tracking:**
- GitHub: `[completar-link]`
- Sprint: 5 | Estado: Pendiente

---

## CU-8.2.1 — Pantalla de detalle de producto por query string (final)

**Consigna del enunciado:**
> "Se debe crear la pantalla detalle, que debe permitirle al cliente ver los detalles de un producto. Se debe tomar el id del producto desde los parámetros de la ruta para traer los datos." *(Requerimientos extra - Cliente)*

**Caso de uso:**
Archivo `producto-detalle.html` con un `<script src="js/producto-detalle.js">`. El JS lee el id de `new URLSearchParams(window.location.search).get('id')`, llama a `GET /api/productos/:id`, y pinta los datos en el DOM. Los links a esta pantalla se arman como `producto-detalle.html?id=5`.

**Por qué:**
Como el frontend es estático sin router, los "parámetros de ruta" se implementan con query string del HTML. La interpretación pragmática del enunciado ("desde los parámetros de la ruta") incluye query string — es estándar HTTP y conceptualmente equivalente al `:id` de un router.

**Nota para defensa:** si el profe insiste en URL del estilo `/productos/5` sin extensión, alcanza con configurar nginx para hacer rewrite a `producto-detalle.html?id=$1`. Si lo aceptan con query string, no hace falta.

**Tracking:**
- GitHub: `[completar-link]`
- Sprint: 5 | Estado: Pendiente

---

## CU-8.2.2 — Agregar al carrito desde detalle (final)

**Consigna del enunciado:**
> *Decisión de UX para que el detalle sea funcional, no solo informativo.*

**Caso de uso:**
Botón "Agregar al carrito" en la pantalla de detalle, con misma lógica que en la lista.

**Por qué:**
Sin este botón, el detalle sería un dead-end. El cliente tendría que volver a la lista para agregar el producto.

**Tracking:**
- GitHub: `[completar-link]`
- Sprint: 5 | Estado: Pendiente

---

# ÉPICA 9: Registros y estadísticas (final) (final)

## CU-9.1.1 — Registrar intentos de login (final)

**Consigna del enunciado:**
> "El sistema debe guardar registro a modo de LOG de cada vez que un usuario administrador inicia sesión." *(Requerimientos extra - Administrador)*

**Caso de uso:**
En cada POST de login (exitoso o fallido), crear registro en `logs_login` con usuario_id (si email existe), fecha, exitoso, ip.

**Por qué:**
Registrar también los fallidos permite detectar ataques de fuerza bruta y da más valor a las estadísticas.

**Tracking:**
- GitHub: `[completar-link]`
- Sprint: 5 | Estado: Pendiente

---

## CU-9.1.2 — Vista de logs en panel (final)

**Consigna del enunciado:**
> "El LOG de inicios de sesión debe poder ser visto en la pantalla de registros." *(Requerimientos extra - Administrador)*

**Caso de uso:**
Tabla en `/admin/registros` con últimos 50 logins. Columnas: fecha, usuario (o "email no registrado"), éxito, IP.

**Por qué:**
50 es un balance entre tener historial visible y no saturar la pantalla. Si se necesita más, se puede agregar paginación.

**Tracking:**
- GitHub: `[completar-link]`
- Sprint: 5 | Estado: Pendiente

---

## CU-9.2.1 — Top 10 productos más vendidos (final)

**Consigna del enunciado:**
> "El administrador debe poder ver los registros de los 10 productos más vendidos." *(Requerimientos extra - Administrador)*

**Caso de uso:**
Query con JOIN entre ventas_productos y productos. Sumar cantidades agrupado por producto. Ordenar descendente, limitar a 10.

**Por qué:**
Sumar cantidades (no contar ventas) es la métrica correcta de "más vendido". Un producto vendido 10 veces de a 1 unidad vende lo mismo que uno vendido 1 vez de a 10 unidades.

**Tracking:**
- GitHub: `[completar-link]`
- Sprint: 5 | Estado: Pendiente

---

## CU-9.2.2 — Top 10 ventas más caras (final)

**Consigna del enunciado:**
> "El administrador debe poder ver los registros de las 10 ventas más caras." *(Requerimientos extra - Administrador)*

**Caso de uso:**
Query ordenando por precio_total desc, limit 10. Incluir cliente y productos.

**Por qué:**
Mostrar productos asociados ayuda a entender qué hizo la venta cara (mucha cantidad vs producto caro).

**Tracking:**
- GitHub: `[completar-link]`
- Sprint: 5 | Estado: Pendiente

---

## CU-9.2.3 — Estadística extra: ventas por categoría (final)

**Consigna del enunciado:**
> "Se deben mostrar dos estadísticas más sobre las ventas / productos / logs en tablas." *(Requerimientos extra - Administrador)*

**Caso de uso:**
Tabla con total facturado por cada categoría (sumando subtotales de VentaProducto agrupados por categoría del Producto).

**Por qué:**
Permite al admin decidir si invertir más en "Lavados" o "Accesorios" según cuál genere más ingreso.

**Tracking:**
- GitHub: `[completar-link]`
- Sprint: 5 | Estado: Pendiente

---

## CU-9.2.4 — Estadística extra: puntuación promedio (final)

**Consigna del enunciado:**
> "Se deben mostrar dos estadísticas más sobre las ventas / productos / logs en tablas." *(Requerimientos extra - Administrador)*

**Caso de uso:**
Promedio de puntuación de encuestas. Cantidad de encuestas respondidas vs ventas totales (% de respuesta).

**Por qué:**
El % de respuesta es una métrica de calidad del proceso post-venta. Indica si los clientes están dispuestos a dar feedback.

**Tracking:**
- GitHub: `[completar-link]`
- Sprint: 5 | Estado: Pendiente

---

# ÉPICA 10: Calidad y entrega

## CU-10.1.1 — Diseño responsive en todas las pantallas

**Consigna del enunciado:**
> "La empresa necesita que la aplicación pueda ser vista tanto en computadoras como en teléfonos móviles (RESPONSIVE)." *(Sección 1)*

**Caso de uso:**
Probar todas las pantallas (cliente y admin) en mobile (375px), tablet (768px), desktop (1280px). Sin scroll horizontal en ninguna.

**Por qué:**
Si una sola pantalla no es responsive, el requisito se considera incumplido. Necesita pasada de QA dedicada.

**Tracking:**
- GitHub: `[completar-link]`
- Sprint: 5 | Estado: Pendiente

---

## CU-10.1.2 — Criterio estético consistente

**Consigna del enunciado:**
> "Ambas partes con vistas en html y css deben contar con criterio a la hora de darle estilos, y se va a pedir que lo mejoren si es necesario." *(Sección 1)*

**Caso de uso:**
Definir paleta de colores (claro y oscuro), tipografía coherente, espaciado y jerarquía visual claros. Aplicar en todas las pantallas.

**Por qué:**
El enunciado advierte que "se va a pedir que lo mejoren si es necesario". Mejor llegar con un estilo terminado que tener que rehacer en revisión.

**Tracking:**
- GitHub: `[completar-link]`
- Sprint: 5 | Estado: Pendiente

---

## CU-10.2.1 — README de cada repo

**Consigna del enunciado:**
> *Decisión de calidad — entregable estándar.*

**Caso de uso:**
README en frontend y backend con instrucciones de instalación, variables de entorno, comandos para correr, credenciales del admin de prueba.

**Por qué:**
Sin README, el profe pierde tiempo descifrando cómo correr el proyecto. Es la primera impresión técnica del entregable.

**Tracking:**
- GitHub: `[completar-link]`
- Sprint: 5 | Estado: Pendiente

---

## CU-10.2.2 — Colección de Postman/Thunder Client

**Consigna del enunciado:**
> *Decisión de calidad para defender la API.*

**Caso de uso:**
Colección exportable con todos los endpoints, variables de entorno para token/URL.

**Por qué:**
Permite al profe probar la API sin armar requests manualmente. Demuestra prolijidad.

**Tracking:**
- GitHub: `[completar-link]`
- Sprint: 5 | Estado: Pendiente

---

## CU-10.3.1 — Repositorios separados

**Consigna del enunciado:**
> "El Trabajo Integrador está dividido en dos proyectos. Un proyecto frontend y un proyecto backend." *(Condiciones de aprobación)*

**Caso de uso:**
Dos repos en GitHub (uno frontend, uno backend) con acceso para ambos integrantes.

**Por qué:**
El enunciado explícita que son dos proyectos. Tener repos separados facilita el versionado y los commits diferenciados.

**Tracking:**
- GitHub: `[completar-link]`
- Sprint: 1 | Estado: Pendiente

---

## CU-10.3.2 — Commits balanceados entre integrantes

**Consigna del enunciado:**
> "AMBOS proyectos deben de ser realizados por AMBOS integrantes del grupo. Se revisarán commits del repositorio para garantizar este requisito. Cualquier alumno que no cumpla con esto, será penalizado con una quita de puntos individual." *(Condiciones de aprobación)*

**Caso de uso:**
Estrategia: cada integrante toma features alternadas, hace PR, el otro lo revisa y mergea. Pair programming en sesiones puntuales.

**Por qué:**
Es el único requisito que tiene penalización **individual** explícita en el enunciado. Vigilarlo continuamente, no al final.

**Tracking:**
- GitHub: `[completar-link]`
- Sprint: continuo | Estado: Pendiente

---

## CU-10.3.3 — Branching y PRs

**Consigna del enunciado:**
> *Decisión técnica derivada del flujo de commits balanceados.*

**Caso de uso:**
Branch `main` protegida. Branches por feature (`feature/login-admin`, `feature/carrito-cliente`). PRs con review del compañero antes de mergear.

**Por qué:**
Forzar PRs garantiza que ambos integrantes ven el código del otro, generando trazabilidad de revisión que sirve para defender el balance.

**Tracking:**
- GitHub: `[completar-link]`
- Sprint: continuo | Estado: Pendiente

---

# Cómo usar este documento

## Setup inicial en GitHub Projects

1. Crear proyecto en GitHub Projects (tipo Board o Table)
2. Crear una columna/estado por: `Backlog`, `Sprint actual`, `En progreso`, `En revisión`, `Done`
3. Por cada CU de este documento, crear un issue en el repo correspondiente (frontend o backend)
4. Usar el ID del CU como prefijo en el título: `[CU-5.3.4] Modal de confirmación de compra`
5. Reemplazar `[completar-link]` por el link al issue: `https://github.com/usuario/repo/issues/XX`

## Workflow por CU

1. Crear branch con el ID: `git checkout -b feature/cu-5-3-4-modal-confirmacion`
2. Hacer commits referenciando el CU: `git commit -m "feat(CU-5.3.4): modal de confirmación con botones confirmar/cancelar"`
3. Al abrir PR, referenciar el issue: `Closes #XX`
4. Asignar reviewer al compañero
5. Mergear cuando esté aprobado

## Para defender el TP

Este documento permite mostrar, para cada caso de uso:
- Qué pide el enunciado textualmente
- Cómo se decidió implementarlo
- Por qué esa decisión
- Dónde está el código (link al PR mergeado en GitHub)

Es la trazabilidad completa enunciado → implementación → código.
