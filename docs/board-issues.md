# Issues del board (GitHub Projects)

Fuente **canónica** de los issues. Un issue por **ticket** (TK), con su **checklist por
CU** (cada caso de uso es un ítem tildable). `armar-board.sh` parsea este archivo y
crea/actualiza los issues a partir de él — editá acá, no en GitHub.

Formato de cada bloque (lo lee el script):
- `## [TK-..] título` → título del issue
- `Labels: a, b, c` → etiquetas
- el resto hasta el próximo `## [TK-..]` → cuerpo

**Columnas del Project:** `Backlog` · `En progreso` · `En revisión` · `Done`

<!-- Los 85 CUs del backlog están repartidos abajo, uno por ticket. Ver matriz al final. -->

---

## [TK-S-01] Bootstrap del proyecto, repos y esqueleto

Labels: setup, fase-1, prioridad-alta

**Objetivo:** Dos repos creados y clonados como carpetas hermanas, con el esqueleto MVC del
backend y el Project conectado.

**Casos de uso cubiertos:**
- [ ] CU-1.1.1 — Init Node/Express: package.json, scripts (start/dev), `.env`, estructura de carpetas MVC
- [ ] CU-1.1.3 — Motor de vistas EJS: `view engine`, layout base reutilizable
- [ ] CU-1.1.4 — Middlewares base: `express.json`, `urlencoded`, `cors`, manejo de errores centralizado
- [ ] CU-10.3.1 — Repos `lavadero-frontend` y `lavadero-backend` separados
- [ ] CU-10.3.2 — Commits balanceados entre integrantes (proceso continuo, vigilar)
- [ ] CU-10.3.3 — Branching mínimo: `main` + branches por feature

**Tareas técnicas:**
- [ ] Crear ambos repos en GitHub y clonarlos como carpetas hermanas
- [ ] Commitear estructura inicial en ambos
- [ ] Crear GitHub Project y conectar el/los repo(s)
- [ ] Columnas Backlog / En progreso / En revisión / Done

**Criterio de aceptación:** el Project muestra las 4 columnas; ambos repos tienen la estructura base commiteada.

**Estimación:** 1 h

---

## [TK-S-02] Dockerización: compose MySQL + backend + frontend

Labels: setup, fase-1, prioridad-alta, infra

**Objetivo:** Con `docker compose up` se levantan los 3 servicios conectados; el único requisito del tester es Docker Desktop.

**Casos de uso cubiertos:**
- [ ] CU-1.3.1 — Dockerfile backend (`node:18-alpine`, EXPOSE 3000)
- [ ] CU-1.3.2 — Dockerfile frontend (`nginx:alpine`, sirve `public/`)
- [ ] CU-1.3.3 — `docker-compose.yml`: servicios `mysql`/`backend`/`frontend`, volumes de DB y uploads, healthcheck + depends_on
- [ ] CU-1.3.4 — Variables de entorno con defaults en el compose (corre sin `.env`) + `.env.example`

**Criterio de aceptación:** `docker compose up` levanta los 3 sin errores; `:8080` da HTML; `:3000/health` da `{status:"ok"}`; existe `lavadero_db`; `down && up` no pierde datos.

**Estimación:** 1.5 hs

---

## [TK-S-03] Backend arranca en Docker y valida la conexión a MySQL

Labels: setup, fase-1, backend

**Objetivo:** El backend dockerizado valida la conexión a MySQL antes de escuchar y responde `/health`.

**Casos de uso cubiertos:**
- [ ] CU-1.1.2 — Conexión a MySQL con Sequelize: `config/database.js`, logging en dev, `testConnection()` con mensaje claro si falla

**Tareas técnicas:**
- [ ] Llamar `testConnection()` en `app.js` antes del `listen` (guard para no correr en tests)
- [ ] Endpoint `GET /health` → `{ status, timestamp }`
- [ ] Test del endpoint con Supertest (fuera del contenedor)

**Criterio de aceptación:** en Docker loguea "Conexión a MySQL establecida"; `npm test` (sin MySQL) sigue verde; si MySQL cae, error claro.

**Estimación:** 45 min

---

## [TK-S-04] Frontend (nginx) sirve estáticos y hace fetch al backend

Labels: setup, fase-1, frontend

**Objetivo:** nginx sirve el esqueleto vanilla y un script verifica la comunicación con el backend (CORS incluido).

**Casos de uso cubiertos:**
- [ ] CU-1.2.1 — Estructura frontend vanilla: `public/` con `.html` por pantalla, `css/` (base/theme/components), `js/` (api/carrito/tema/nav), `package.json` solo dev (vitest+jsdom)

**Tareas técnicas:**
- [ ] `index.html` + `api.js` (wrapper fetch) + `main.js` (pega a `/health`)
- [ ] CORS en backend para `http://localhost:8080`
- [ ] `tests/api.test.js` con fetch mockeado

**Criterio de aceptación:** `:8080` muestra el estado del backend sin errores de CORS; `npm test` pasa.

**Estimación:** 1 h

---

## [TK-S-05] GitHub Actions (CI básico) — opcional

Labels: setup, fase-1, infra, prioridad-baja

**Objetivo:** Cada PR corre los tests automáticamente.

**Tareas técnicas:**
- [ ] `.github/workflows/tests.yml` en cada repo (npm install + npm test en push y PR)

**Criterio de aceptación:** los PRs muestran el check de tests. (Sin CU asociado — es infra; nice-to-have.)

**Estimación:** 30 min

---

## [TK-S-06] Hot reload en desarrollo (compose dev)

Labels: setup, fase-1, infra

**Objetivo:** En desarrollo el código se recarga solo, sin rebuild ni reinicios a mano. El compose base (producción) no se toca.

**Tareas técnicas:**
- [ ] `docker-compose.dev.yml` como override de dev (se activa explícito, no se carga solo)
- [ ] Backend: volúmenes `./src`, `./seeders`, `./uploads` + arranque con `npm run dev` (`node --watch`)
- [ ] Backend: imagen con dev deps vía `ARG INSTALL_DEV=true`
- [ ] Frontend: montar `../lavadero-frontend/public` en `/usr/share/nginx/html:ro`
- [ ] Script `docker:dev` en `package.json`
- [ ] Documentar el flujo de dev en el README

**Criterio de aceptación:** `npm run docker:dev` levanta los 3 servicios con el override; editar `src/` reinicia el backend solo; editar `public/` se ve al refrescar; `docker compose up --build` (sin override) sigue en modo producción.

**Estimación:** 1 h (sin CU asociado, es infra de DX)

---

## [TK-F-01] Modelo Categoria + endpoint de listado

Labels: fullstack, fase-2

**Objetivo:** Categorías en BD, expuestas por API y consumidas con fetch.

**Casos de uso cubiertos:**
- [ ] CU-2.1.1 — Modelo `Categoria` (id, nombre, descripcion)
- [ ] CU-2.2.1 — Seed de categorías ("Lavados", "Accesorios")
- [ ] CU-3.1.3 — `GET /api/categorias`

**Tareas técnicas:**
- [ ] `getCategorias()` en `js/api.js` (console.log al cargar `productos.html`)
- [ ] Tests: endpoint (Supertest) + `getCategorias()` (fetch mockeado)

**Criterio de aceptación:** seed crea 2 filas; el endpoint devuelve 2; tests pasan.

**Estimación:** 1.5 hs

---

## [TK-F-02] Modelo Producto + alta + listado paginado

Labels: fullstack, fase-2

**Objetivo:** Productos en BD, listado paginado, alta con imagen, pantalla `productos.html` con tabs y paginación.

**Casos de uso cubiertos:**
- [ ] CU-2.1.2 — Modelo `Producto` (precio DECIMAL, imagen path, FK categoria, activo, timestamps)
- [ ] CU-2.2.2 — Seed de 16 productos activos (8 por categoría)
- [ ] CU-3.1.1 — `GET /api/productos?page&limit&categoria&activo` con paginación
- [ ] CU-3.2.1 — `POST /api/productos` (multipart, multer, activo=true)
- [ ] CU-3.3.1 — Middleware de validación de productos (express-validator)
- [ ] CU-5.2.1 — Visualización por categorías (tabs Lavados/Accesorios)
- [ ] CU-5.2.2 — Paginación: 8 productos por página, controles prev/next
- [ ] CU-5.2.3 — Diseño responsive (1/2/3-4 columnas)

**Tareas técnicas:**
- [ ] `js/productos.js` + `renderProductoCard()`; estilos `.producto-card`/`.productos-grid`
- [ ] Tests: endpoint (happy/validación/paginación) + módulo JS con jsdom

**Criterio de aceptación:** seed 16; `?page=1&limit=8` da 8 + paginación; tabs y paginación andan; tests pasan.

**Estimación:** 4-5 hs

---

## [TK-F-03] Modelo Usuario + autenticación admin

Labels: fullstack, fase-2, backend

**Objetivo:** Usuario admin, registro vía API, login con sesión, middleware de protección, vista EJS de login.

**Casos de uso cubiertos:**
- [ ] CU-2.1.3 — Modelo `Usuario` (email único, password hash, es_admin) + hook de hash
- [ ] CU-2.2.3 — Seed de admin de prueba (admin@lavadero.com / admin123)
- [ ] CU-4.1.1 — `POST /api/auth/registro-admin` (bcrypt, email único)
- [ ] CU-4.2.1 — `POST /api/auth/login` (401 sin filtrar si el email existe)
- [ ] CU-4.2.2 — `GET/POST /admin/login` (vista EJS)
- [ ] CU-4.2.3 — Botón de acceso rápido (autocompleta credenciales del admin)
- [ ] CU-4.2.4 — Middleware `requireAdmin` (redirige/401 según vista o API)
- [ ] CU-4.2.5 — Logout (destruye sesión)

**Tareas técnicas:**
- [ ] `login.ejs` + layout admin; link a `/admin/login` en el header del cliente
- [ ] Tests: hash, login ok/fallido, middleware bloquea sin sesión

**Criterio de aceptación:** registro hashea; login con seed redirige al dashboard; acceso rápido autocompleta; dashboard sin sesión redirige; tests pasan.

**Estimación:** 4-5 hs

---

## [TK-F-04] Backoffice: dashboard y CRUD completo de productos

Labels: fullstack, fase-2, backend

**Objetivo:** El admin lista, crea, edita, activa y desactiva productos desde el panel EJS.

**Casos de uso cubiertos:**
- [ ] CU-3.1.2 — `GET /api/productos/:id` (404 si no existe, incluye categoría)
- [ ] CU-3.2.2 — `PUT /api/productos/:id` (imagen opcional, borra la anterior)
- [ ] CU-3.2.3 — Baja lógica `PATCH /:id/desactivar` (activo=false)
- [ ] CU-3.2.4 — Reactivación `PATCH /:id/activar`
- [ ] CU-3.3.2 — Middleware de validación de imagen (mime + tamaño)
- [ ] CU-6.1.1 — Dashboard: tabla de productos con estado
- [ ] CU-6.1.2 — Acciones por producto (editar / activar / desactivar)
- [ ] CU-6.1.3 — Botón "Agregar producto"
- [ ] CU-6.2.1 — Pantalla de alta (form + validación)
- [ ] CU-6.2.2 — Pantalla de edición (reutiliza alta, datos precargados)
- [ ] CU-6.2.3 — Modales de confirmación (activar/desactivar)

**Criterio de aceptación:** dashboard lista con estados; alta/edición andan; activar/desactivar por modal cambian estado; tests de los endpoints pasan.

**Estimación:** 5-6 hs

---

## [TK-F-05] Flujo cliente: bienvenida + carrito + venta

Labels: fullstack, fase-2

**Objetivo:** El cliente ingresa su nombre, navega, usa el carrito y finaliza la compra (total server-side).

**Casos de uso cubiertos:**
- [ ] CU-2.1.4 — Modelo `Venta` (nombre_usuario, fecha, precio_total)
- [ ] CU-2.1.5 — Modelo `VentaProducto` pivot (cantidad, precio_unitario = snapshot)
- [ ] CU-5.1.1 — Bienvenida: input de nombre → sessionStorage; guard de acceso
- [ ] CU-5.2.4 — Agregar producto al carrito (suma cantidad + feedback)
- [ ] CU-5.2.5 — Quitar desde la pantalla de productos (a 0 se elimina)
- [ ] CU-5.2.6 — Indicador de items en carrito (badge en header)
- [ ] CU-5.3.1 — Listado de productos en carrito (subtotales + total)
- [ ] CU-5.3.2 — Modificar cantidades (+/- e input, mínimo 1)
- [ ] CU-5.3.3 — Eliminar producto del carrito
- [ ] CU-5.3.4 — Confirmar compra con modal `<dialog>`
- [ ] CU-5.3.5 — `POST /api/ventas` (total calculado en backend)

**Tareas técnicas:**
- [ ] `js/carrito.js` con funciones puras sobre sessionStorage
- [ ] Tests: `carrito.js` (Vitest puro) + endpoint (happy/producto inexistente/cantidad inválida)

**Criterio de aceptación:** sin nombre no se accede a productos; carrito sobrevive a navegar/refrescar; venta persiste con total server-side; tests pasan.

**Estimación:** 6-7 hs

---

## [TK-F-06] Ticket + PDF + reinicio del flujo

Labels: fullstack, fase-2, frontend

**Objetivo:** Mostrar el ticket post-compra, descargarlo en PDF y reiniciar el flujo.

**Casos de uso cubiertos:**
- [ ] CU-5.4.1 — Mostrar ticket (empresa, cliente, fecha, productos, subtotales, total)
- [ ] CU-5.4.2 — Descargar ticket en PDF (jsPDF, nombre `ticket-{fecha}-{nombre}.pdf`)
- [ ] CU-5.4.3 — Botón salir/reiniciar (limpia estado → bienvenida; en final → encuesta)

**Tareas técnicas:**
- [ ] `formatearTicket(venta)` (Vitest puro) + `generarPDF()` con jsPDF mockeado

**Criterio de aceptación:** el ticket muestra todos los datos; el PDF replica; salir limpia sessionStorage; tests pasan.

**Estimación:** 3 hs

---

## [TK-F-07] Reportes: Excel de ventas

Labels: fullstack, fase-2, backend

**Objetivo:** El admin descarga un Excel con todas las ventas y sus productos.

**Casos de uso cubiertos:**
- [ ] CU-6.1.4 — Botón "Descargar ventas en Excel" en el dashboard
- [ ] CU-7.1.1 — `GET /admin/ventas/excel` con exceljs (headers en negrita, fecha legible)
- [ ] CU-7.1.2 — `GET /api/ventas` con eager loading de productos + paginación

**Criterio de aceptación:** el Excel incluye id, cliente, fecha, total y productos; el endpoint trae los productos asociados; test valida la estructura.

**Estimación:** 2 hs

---

## [TK-F-08] Temas claro/oscuro + responsive + branding global

Labels: fullstack, fase-2, frontend

**Objetivo:** Toggle de tema persistente, branding consistente y QA responsive en todas las pantallas.

**Casos de uso cubiertos:**
- [ ] CU-1.2.2 — Branding global (nombre app, logo, favicon, integrantes en el header)
- [ ] CU-1.2.3 — Temas claro/oscuro (variables CSS, toggle, persiste en localStorage, anti-flash)
- [ ] CU-1.2.4 — Barra de navegación persistente en todas las pantallas
- [ ] CU-10.1.1 — Responsive en todas las pantallas (375/768/1280, sin scroll horizontal)
- [ ] CU-10.1.2 — Criterio estético consistente (paleta, tipografía, jerarquía)

**Tareas técnicas:**
- [ ] `css/theme.css`, `js/tema.js`, header vía `js/nav.js`
- [ ] Tests: `tema.js` con localStorage mockeado

**Criterio de aceptación:** el tema persiste al recargar; header consistente; sin scroll horizontal; tests pasan.

**Estimación:** 3-4 hs

---

## [TK-F-09] Encuesta (final)

Labels: fullstack, fase-3, final

**Objetivo:** Capturar feedback del cliente después de la compra.

**Casos de uso cubiertos:**
- [ ] CU-2.1.6 — Modelo `Encuesta` (email, comentario, puntuacion, recomendaria, imagen, venta_id)
- [ ] CU-8.1.1 — Redirigir desde el ticket a la encuesta
- [ ] CU-8.1.2 — Formulario con 5 tipos de input (textarea, email, checkbox, range, file)
- [ ] CU-8.1.3 — Validaciones (email, comentario, slider 1-10, imagen) con errores por campo
- [ ] CU-8.1.4 — `POST /api/encuestas` (multipart, imagen en `/uploads/encuestas`)
- [ ] CU-8.1.5 — Botón "omitir" (secundario, vuelve a inicio sin guardar)
- [ ] CU-8.1.6 — Modal de agradecimiento + persistir con fecha

**Criterio de aceptación:** la encuesta persiste con fecha; validaciones muestran errores; omitir no guarda; tests pasan.

**Estimación:** ~4 hs

---

## [TK-F-10] Detalle de producto (final)

Labels: fullstack, fase-3, final

**Objetivo:** Pantalla de detalle de un producto por ID.

**Casos de uso cubiertos:**
- [ ] CU-8.2.1 — Ruta dinámica `/productos/:id` → `GET /api/productos/:id`, imagen grande + datos
- [ ] CU-8.2.2 — Botón "agregar al carrito" desde el detalle

**Criterio de aceptación:** la pantalla muestra todos los datos; agregar funciona igual que en el listado; test con fetch mockeado.

**Estimación:** ~2 hs

---

## [TK-F-11] Logs de login + pantalla de registros (final)

Labels: fullstack, fase-3, final, backend

**Objetivo:** Registrar intentos de login y mostrarlos en el panel admin.

**Casos de uso cubiertos:**
- [ ] CU-2.1.7 — Modelo `LogLogin` (usuario_id, fecha, exitoso, ip)
- [ ] CU-6.1.5 — Botón "Ver registros" en el dashboard
- [ ] CU-9.1.1 — Registrar cada intento de login (exitoso o fallido) con ip
- [ ] CU-9.1.2 — Vista `/admin/registros` (tabla con últimos 50)

**Criterio de aceptación:** cada login crea un registro; la pantalla lista los últimos 50; tests pasan.

**Estimación:** ~3 hs

---

## [TK-F-12] Estadísticas + Excel de encuestas (final)

Labels: fullstack, fase-3, final, backend

**Objetivo:** Métricas del sistema en el panel admin + exportación de encuestas.

**Casos de uso cubiertos:**
- [ ] CU-7.2.1 — `GET /admin/encuestas/excel` (exceljs)
- [ ] CU-9.2.1 — Top 10 productos más vendidos (JOIN + suma de cantidades)
- [ ] CU-9.2.2 — Top 10 ventas más caras
- [ ] CU-9.2.3 — Ventas por categoría (total facturado)
- [ ] CU-9.2.4 — Promedio de puntuación de encuestas (respondidas vs omitidas)
- [ ] CU-9.2.5 — Botón "Descargar encuestas en Excel" en registros

**Criterio de aceptación:** las 4 estadísticas se muestran; el Excel de encuestas se descarga; tests de las queries pasan.

**Estimación:** ~4 hs

---

## [TK-F-13] Documentación de entrega (README + Postman)

Labels: docs, fase-2, final

**Objetivo:** Documentación lista para que los profes instalen, levanten y prueben la API sin fricción.

**Casos de uso cubiertos:**
- [ ] CU-10.2.1 — README de cada repo (instalación, variables de entorno, comandos, credenciales del admin de prueba)
- [ ] CU-10.2.2 — Colección Postman/Thunder Client con todos los endpoints + variables de entorno para el token/sesión

**Criterio de aceptación:** un tester puede, solo con el README, levantar el sistema y correr la colección contra la API.

**Estimación:** ~2 hs

---

## Matriz de cobertura (CU → ticket)

Los **85 CUs** del backlog repartidos, cada uno en **un** ticket:

| Épica | CUs | Ticket(s) |
|-------|-----|-----------|
| 1.1 Backend setup | 1.1.1, 1.1.3, 1.1.4 / 1.1.2 | TK-S-01 / TK-S-03 |
| 1.2 Frontend setup | 1.2.1 / 1.2.2, 1.2.3, 1.2.4 | TK-S-04 / TK-F-08 |
| 1.3 Docker | 1.3.1–1.3.4 | TK-S-02 |
| 2 Modelos | 2.1.1, 2.2.1 / 2.1.2, 2.2.2 / 2.1.3, 2.2.3 / 2.1.4, 2.1.5 / 2.1.6 / 2.1.7 | F-01 / F-02 / F-03 / F-05 / F-09 / F-11 |
| 3 API productos | 3.1.3 / 3.1.1, 3.2.1, 3.3.1 / 3.1.2, 3.2.2, 3.2.3, 3.2.4, 3.3.2 | F-01 / F-02 / F-04 |
| 4 Auth | 4.1.1, 4.2.1–4.2.5 | TK-F-03 |
| 5 Flujo cliente | 5.2.1, 5.2.2, 5.2.3 / 5.1.1, 5.2.4–5.2.6, 5.3.1–5.3.5 / 5.4.1–5.4.3 | F-02 / F-05 / F-06 |
| 6 Backoffice | 6.1.1, 6.1.2, 6.1.3, 6.2.1–6.2.3 / 6.1.4 / 6.1.5 | F-04 / F-07 / F-11 |
| 7 Reportes | 7.1.1, 7.1.2 / 7.2.1 | F-07 / F-12 |
| 8 Encuestas | 8.1.1–8.1.6 / 8.2.1, 8.2.2 | F-09 / F-10 |
| 9 Registros | 9.1.1, 9.1.2 / 9.2.1–9.2.5 | F-11 / F-12 |
| 10 Calidad/entrega | 10.1.1, 10.1.2 / 10.2.1, 10.2.2 / 10.3.1–10.3.3 | F-08 / F-13 / TK-S-01 |

> Verificación: `bash docs/validar-cobertura.sh` (cruza este archivo contra `backlog.md`).
