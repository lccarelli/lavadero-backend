# Issues para el board (GitHub Projects)

Un issue por **ticket** (TK). Cada bloque está listo para copiar como issue:
el `##` es el título, los `Labels:` son las etiquetas, y el cuerpo va tal cual.

**Columnas del Project:** `Backlog` · `En progreso` · `En revisión` · `Done`

> Para crear en masa con `gh`, ver `crear-issues.sh` (en esta misma carpeta).

---

## [TK-S-01] Bootstrap del proyecto y repos

`Labels: setup, fase-1, prioridad-alta`

**Objetivo:** Tener los dos repositorios creados, clonados localmente, con la estructura base del esqueleto.

**Tareas:**
- [ ] Crear repos `lavadero-frontend` y `lavadero-backend` en GitHub
- [ ] Clonarlos como carpetas hermanas (`tp-lavadero/`)
- [ ] Commitear estructura inicial en ambos
- [ ] Crear GitHub Project y conectarlo a ambos repos
- [ ] Configurar columnas Backlog / En progreso / En revisión / Done

**Criterio de aceptación:**
- El GitHub Project muestra las 4 columnas y está vinculado a ambos repos

**Estimación:** 30 min · **Fullstack:** ❌

---

## [TK-S-02] Dockerización - compose con MySQL + backend + frontend

`Labels: setup, fase-1, prioridad-alta, infra`

**Objetivo:** Que con `docker-compose up` se levante MySQL + backend + frontend conectados. Los testers solo instalan Docker Desktop.

**Tareas:**
- [ ] `lavadero-backend/Dockerfile` (node:18-alpine, npm install, copy src/, EXPOSE 3000)
- [ ] `lavadero-frontend/Dockerfile` (nginx:alpine, copy public/ a /usr/share/nginx/html)
- [ ] `docker-compose.yml` (en backend) con servicios `mysql`, `backend`, `frontend`
- [ ] Volume `mysql_data` para persistencia de la BD
- [ ] Volume `./uploads` para persistencia de imágenes
- [ ] `depends_on: mysql` (con healthcheck) en backend
- [ ] `backend/.env.example` con `DB_HOST=mysql`, `DB_NAME=lavadero_db`, etc.
- [ ] Documentar puertos en README: frontend 8080, API 3000, MySQL 3306

**Criterio de aceptación:**
- `docker-compose up` levanta los 3 servicios sin errores
- `http://localhost:8080` devuelve HTML
- `http://localhost:3000/health` responde `{ status: "ok" }`
- `SHOW DATABASES;` muestra `lavadero_db`
- `down && up` reinicia sin perder datos

**Estimación:** 1.5 hs · **Fullstack:** ❌

---

## [TK-S-03] Backend arranca en Docker y se conecta a la DB

`Labels: setup, fase-1, backend`

**Objetivo:** El backend dockerizado se conecta a MySQL del compose y responde `/health`.

**Tareas:**
- [ ] Copiar `.env.example` a `.env`
- [ ] Llamar `testConnection()` en `src/app.js` antes del `listen`
- [ ] Endpoint `GET /health` → `{ status: "ok", timestamp }`
- [ ] Test del endpoint con Supertest (fuera del contenedor)
- [ ] Verificar log "Conexión a MySQL establecida"

**Criterio de aceptación:**
- `docker-compose up backend` arranca y loguea la conexión a MySQL
- `GET /health` responde ok
- `npm test` pasa el test de health
- Si MySQL está caído, el backend muestra error claro

**Estimación:** 45 min · **Fullstack:** ❌

---

## [TK-S-04] Frontend (nginx) sirve estáticos y hace fetch al backend

`Labels: setup, fase-1, frontend`

**Objetivo:** nginx sirve un HTML mínimo y un script hace `fetch` al `/health` (verifica CORS end-to-end).

**Tareas:**
- [ ] `public/index.html` con `<div id="status">`
- [ ] `public/js/api.js` con `API_URL` y wrapper de `fetch`
- [ ] `public/js/main.js` que llama al `/health` y pinta `#status`
- [ ] Habilitar CORS en backend para `http://localhost:8080`
- [ ] `package.json` con vitest + jsdom
- [ ] `vitest.config.js` con `environment: 'jsdom'`
- [ ] `tests/api.test.js` con fetch mockeado

**Criterio de aceptación:**
- `http://localhost:8080` muestra el estado del backend
- Sin errores de CORS en consola
- `npm test` pasa

**Estimación:** 1 h · **Fullstack:** ❌

---

## [TK-S-05] GitHub Actions (CI básico) — opcional

`Labels: setup, fase-1, infra, prioridad-baja`

**Objetivo:** Cada PR corre los tests automáticamente.

**Tareas:**
- [ ] `.github/workflows/tests.yml` en cada repo
- [ ] Corre `npm install` + `npm test` en push y PR

**Criterio de aceptación:**
- Los PRs muestran el check de tests

**Estimación:** 30 min · **Fullstack:** ❌ · **Prioridad:** baja (nice-to-have)

---

## [TK-S-06] Hot reload en desarrollo (compose dev)

`Labels: setup, fase-1, infra`

**Objetivo:** En desarrollo el código se recarga solo, sin rebuild ni reinicios a mano. El compose base (producción) no se toca.

**Tareas:**
- [ ] `docker-compose.dev.yml` como override de dev (se activa explícito, no se carga solo)
- [ ] Backend: volúmenes `./src`, `./seeders`, `./uploads` + arranque con `npm run dev` (`node --watch`)
- [ ] Backend: imagen con dev deps vía `ARG INSTALL_DEV=true`
- [ ] Frontend: montar `../lavadero-frontend/public` en `/usr/share/nginx/html:ro`
- [ ] Script `docker:dev` en `package.json` (`compose -f base -f dev up --build -d`)
- [ ] Documentar el flujo de dev en el README

**Criterio de aceptación:**
- `npm run docker:dev` levanta los 3 servicios con el override
- Editar `src/` reinicia el backend solo (sin `build`)
- Editar `public/` del frontend se ve al refrescar (sin rebuild)
- `docker compose up --build` (sin override) sigue arrancando en modo producción
- vitest/supertest disponibles dentro del contenedor de backend en dev

**Estimación:** 1 h · **Fullstack:** ❌

---

## [TK-F-01] Modelo Categoria + endpoint de listado

`Labels: fullstack, fase-2, epica-2, epica-3`

**Objetivo:** Categorías "Lavados" y "Accesorios" en BD, expuestas por API y consumidas con `fetch`.

**Capas:**
- **DB:** Modelo `Categoria` + seeder con las 2 categorías
- **Backend:** `GET /api/categorias` + test (Supertest)
- **Frontend:** `getCategorias()` en `api.js`, usado en `productos.html` (console.log por ahora)
- **Tests:** endpoint + `getCategorias()` con fetch mockeado

**Criterio de aceptación:**
- Tras el seed, `categorias` tiene 2 filas
- `GET /api/categorias` devuelve array de 2
- El front logea las categorías
- Tests pasan

**Estimación:** 1.5 hs · **CUs:** CU-2.1.1, CU-2.2.1, CU-3.1.3

---

## [TK-F-02] Modelo Producto + alta + listado paginado

`Labels: fullstack, fase-2, epica-2, epica-3, epica-5`

**Objetivo:** Productos en BD, listado paginado, alta con imagen, `productos.html` con tabs y paginación.

**Capas:**
- **DB:** Modelo `Producto` (FK Categoria) + seeder con 16 productos
- **Backend:** `GET /api/productos?page=&limit=&categoria=&activo=`, `POST /api/productos` (multer), validaciones express-validator, tests
- **Frontend:** `productos.html` (tabs + grid + paginación), `js/productos.js`, `renderProductoCard()`, estilos responsive
- **Tests:** endpoint + módulo JS con jsdom

**Criterio de aceptación:**
- Seeder crea 16 productos activos
- `GET /api/productos?page=1&limit=8` → 8 productos + paginación
- `productos.html` muestra tabs y paginación funcionales
- Tests pasan

**Estimación:** 4-5 hs · **CUs:** CU-2.1.2, CU-2.2.2, CU-3.1.1, CU-3.2.1, CU-3.3.1, CU-5.2.1, CU-5.2.2, CU-5.2.3

---

## [TK-F-03] Modelo Usuario + autenticación admin

`Labels: fullstack, fase-2, epica-2, epica-4, backend`

**Objetivo:** Usuario admin, registro vía API, login con sesión, middleware de protección.

**Capas:**
- **DB:** Modelo `Usuario` (hook hash password) + seeder admin
- **Backend:** `POST /api/auth/registro-admin`, `POST /api/auth/login`, `GET/POST /admin/login`, `POST /admin/logout`, middleware `requireAdmin`, tests
- **Frontend:** link a `/admin/login` en el header del cliente
- **EJS:** `login.ejs` con botón de acceso rápido, layout base del admin

**Criterio de aceptación:**
- Registro crea admin con password hasheado
- Login con seed redirige a `/admin/dashboard`
- Botón de acceso rápido autocompleta inputs
- `/admin/dashboard` sin sesión redirige a login
- Tests pasan

**Estimación:** 4-5 hs · **CUs:** CU-2.1.3, CU-2.2.3, CU-4.1.1, CU-4.2.1, CU-4.2.2, CU-4.2.3, CU-4.2.4, CU-4.2.5

---

## [TK-F-04] Backoffice - Dashboard y CRUD completo de productos

`Labels: fullstack, fase-2, epica-3, epica-6, backend`

**Objetivo:** Admin lista, crea, edita, activa y desactiva productos desde el panel EJS.

**Capas:**
- **Backend:** `PUT /api/productos/:id`, `PATCH .../activar`, `PATCH .../desactivar`, `GET /api/productos/:id`
- **EJS:** `dashboard.ejs` (tabla), `productoForm.ejs` (alta/edición), modales de confirmación
- **Tests:** todos los endpoints nuevos

**Criterio de aceptación:**
- Dashboard lista productos con estados
- "Agregar"/"Editar" navegan a los forms
- Activar/Desactivar abren modal y cambian estado
- Tests pasan

**Estimación:** 5-6 hs · **CUs:** CU-3.1.2, CU-3.2.2, CU-3.2.3, CU-3.2.4, CU-3.3.2, CU-6.1.1, CU-6.1.2, CU-6.1.3, CU-6.2.1, CU-6.2.2, CU-6.2.3

---

## [TK-F-05] Flujo cliente - Bienvenida + carrito + venta

`Labels: fullstack, fase-2, epica-2, epica-5`

**Objetivo:** Cliente ingresa nombre, navega productos, usa el carrito y finaliza la compra.

**Capas:**
- **DB:** Modelos `Venta` y `VentaProducto` (M:N) con snapshot de precio
- **Backend:** `POST /api/ventas` (transacción + total server-side) + tests
- **Frontend:** `index.html` (nombre → sessionStorage), `js/carrito.js` (funciones puras), botones +/- en cards, `carrito.html`, modal `<dialog>`, badge en header
- **Tests:** `carrito.js` (Vitest puro) + endpoint (Supertest)

**Criterio de aceptación:**
- Sin nombre no se accede a productos
- Carrito sobrevive a navegar y refrescar
- Modal de confirmación con resumen
- Venta persiste con total calculado server-side
- Tests pasan

**Estimación:** 6-7 hs · **CUs:** CU-2.1.4, CU-2.1.5, CU-5.1.1, CU-5.2.4, CU-5.2.5, CU-5.2.6, CU-5.3.1, CU-5.3.2, CU-5.3.3, CU-5.3.4, CU-5.3.5

---

## [TK-F-06] Ticket + PDF + reinicio del flujo

`Labels: fullstack, fase-2, epica-5, frontend`

**Objetivo:** Mostrar ticket post-compra, descargarlo en PDF y reiniciar el flujo.

**Capas:**
- **Frontend:** `ticket.html`, `js/ticket.js` (lee `ultimaVenta` o la pide por ID), jsPDF por CDN, botón descargar PDF, botón salir (`sessionStorage.clear()`)
- **Tests:** `formatearTicket(venta)` (Vitest puro) + `generarPDF()` con jsPDF mockeado

**Criterio de aceptación:**
- Ticket muestra cliente, fecha, productos, subtotales, total, empresa
- PDF con los mismos datos
- Salir limpia sessionStorage y vuelve a `index.html`
- Tests pasan

**Estimación:** 3 hs · **CUs:** CU-5.4.1, CU-5.4.2, CU-5.4.3

---

## [TK-F-07] Reportes - Excel de ventas

`Labels: fullstack, fase-2, epica-7, backend`

**Objetivo:** Admin descarga Excel con todas las ventas y sus productos.

**Capas:**
- **Backend:** `GET /admin/ventas/excel` (exceljs), `GET /api/ventas` (eager loading)
- **EJS:** botón en dashboard
- **Tests:** estructura del archivo generado

**Criterio de aceptación:**
- El Excel incluye id, cliente, fecha, total y productos
- Tests pasan

**Estimación:** 2 hs · **CUs:** CU-7.1.1, CU-7.1.2

---

## [TK-F-08] Temas claro/oscuro + responsive + branding global

`Labels: fullstack, fase-2, epica-1, epica-10, frontend`

**Objetivo:** Toggle de tema persistente, pantallas responsive, branding consistente.

**Capas:**
- **Frontend:** `css/theme.css` (variables claro/oscuro), `js/tema.js` (aplicar/toggle/cargar), script inline anti-flash, toggle en header (`nav.js`), QA responsive (375/768/1280), header con logo + integrantes, favicon
- **Tests:** `tema.js` con localStorage mockeado

**Criterio de aceptación:**
- El tema persiste al recargar
- Sin scroll horizontal en ninguna resolución
- Header consistente en todas las pantallas
- Tests pasan

**Estimación:** 3-4 hs · **CUs:** CU-1.2.2, CU-1.2.3, CU-1.2.4, CU-5.2.3, CU-10.1.1, CU-10.1.2

---

## [TK-F-09] ⭐ Encuesta (final)

`Labels: fullstack, fase-3, epica-8, final`

**Objetivo:** Capturar feedback del cliente tras la compra.

**Capas:**
- **DB:** Modelo `Encuesta`
- **Backend:** `POST /api/encuestas` (multipart, imagen en `/uploads/encuestas`)
- **Frontend:** pantalla con 5 tipos de input (textarea, email, checkbox, slider, file), validaciones, modal de agradecimiento, botón omitir
- **Tests:** validaciones del formulario + endpoint

**Criterio de aceptación:**
- Encuesta persiste con fecha
- Validaciones muestran errores por campo
- Botón omitir vuelve a inicio sin guardar
- Tests pasan

**Estimación:** ~4 hs · **CUs:** CU-2.1.6, CU-8.1.1 a CU-8.1.6

---

## [TK-F-10] ⭐ Detalle de producto (final)

`Labels: fullstack, fase-3, epica-8, final`

**Objetivo:** Pantalla de detalle de un producto por ID.

**Capas:**
- **Frontend:** `producto-detalle.html` que lee el id, llama `GET /api/productos/:id`, muestra imagen grande + datos, botón agregar al carrito
- **Tests:** render del detalle con fetch mockeado

**Criterio de aceptación:**
- La pantalla muestra todos los datos del producto
- Agregar al carrito funciona igual que en el listado
- Tests pasan

**Estimación:** ~2 hs · **CUs:** CU-8.2.1, CU-8.2.2

---

## [TK-F-11] ⭐ Logs de login + pantalla de registros (final)

`Labels: fullstack, fase-3, epica-9, final, backend`

**Objetivo:** Registrar intentos de login y mostrarlos en el panel admin.

**Capas:**
- **DB:** Modelo `LogLogin`
- **Backend:** registrar cada login (ok/fallido) con ip; `GET /admin/registros`
- **EJS:** tabla con últimos 50 logins
- **Tests:** se crea el log en login ok/fallido

**Criterio de aceptación:**
- Cada login crea un registro con fecha, usuario, éxito, ip
- La pantalla lista los últimos 50
- Tests pasan

**Estimación:** ~3 hs · **CUs:** CU-2.1.7, CU-9.1.1, CU-9.1.2

---

## [TK-F-12] ⭐ Estadísticas + Excel de encuestas (final)

`Labels: fullstack, fase-3, epica-7, epica-9, final, backend`

**Objetivo:** Métricas del sistema en el panel admin.

**Capas:**
- **Backend:** top 10 productos vendidos, top 10 ventas más caras, ventas por categoría, promedio de puntuación; `GET /admin/encuestas/excel`
- **EJS:** sección de estadísticas en registros + botón descargar encuestas
- **Tests:** queries de estadísticas

**Criterio de aceptación:**
- Las 4 estadísticas se muestran correctamente
- El Excel de encuestas se descarga
- Tests pasan

**Estimación:** ~4 hs · **CUs:** CU-7.2.1, CU-9.2.1 a CU-9.2.5

---

## Resumen

| Fase | Tickets | Estimado |
|------|---------|----------|
| Setup (Fase 1) | TK-S-01 a TK-S-05 | ~3 hs |
| Fullstack cursada (Fase 2) | TK-F-01 a TK-F-08 | ~30 hs |
| Fullstack final (Fase 3) ⭐ | TK-F-09 a TK-F-12 | ~15 hs |

**Recordatorio del enunciado:** ambos integrantes deben tener commits en **ambos** repos.
