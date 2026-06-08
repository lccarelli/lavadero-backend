# Especificación técnica - TP Integrador Programación III
## Lavadero de autos - Autoservicio

Este documento separa el QUÉ (requerimientos funcionales, lo que pide el enunciado) del CÓMO (requerimientos no funcionales y stack tecnológico).

---

# 1. Requerimientos funcionales (RF)

Lo que el sistema debe HACER. Son los comportamientos observables que los profes van a testear contra el enunciado.

## 1.1. Módulo Cliente (Frontend)

| ID | Requerimiento | Cursada / Final |
|----|---------------|-----------------|
| RF-C-01 | El sistema solicita el nombre del cliente al iniciar antes de mostrar productos | Cursada |
| RF-C-02 | El cliente puede visualizar productos divididos en dos categorías | Cursada |
| RF-C-03 | Cada producto muestra: imagen, nombre, descripción, precio | Cursada |
| RF-C-04 | El cliente puede agregar productos al carrito | Cursada |
| RF-C-05 | El cliente puede modificar cantidades dentro del carrito | Cursada |
| RF-C-06 | El cliente puede eliminar productos del carrito | Cursada |
| RF-C-07 | Antes de confirmar la compra se muestra un modal de confirmación | Cursada |
| RF-C-08 | Al finalizar la compra se registra la venta en BD y se muestra ticket | Cursada |
| RF-C-09 | El ticket muestra productos, cantidades, nombre del cliente, fecha y nombre de empresa | Cursada |
| RF-C-10 | El ticket es descargable en formato PDF | Cursada |
| RF-C-11 | Al finalizar, el sistema vuelve al estado inicial (es autoservicio, no e-commerce) | Cursada |
| RF-C-12 | El cliente solo puede ver productos activos | Cursada |
| RF-C-13 | Existe un botón para acceder al login del admin | Cursada |
| RF-C-14 | El cliente puede cambiar entre tema claro y oscuro, persistiendo la elección | Cursada |
| RF-C-15 | Después del ticket, el cliente accede a una pantalla de encuesta | Final |
| RF-C-16 | La encuesta contiene al menos 5 tipos de input (textarea, email, checkbox, slider, file) | Final |
| RF-C-17 | El cliente puede omitir la encuesta con un botón secundario | Final |
| RF-C-18 | Existe una pantalla de detalle de producto accesible por ID en URL | Final |

## 1.2. Módulo Administrador (Backoffice EJS)

| ID | Requerimiento | Cursada / Final |
|----|---------------|-----------------|
| RF-A-01 | El admin debe autenticarse con email y password para acceder al panel | Cursada |
| RF-A-02 | El login posee un botón de acceso rápido que autocompleta credenciales | Cursada |
| RF-A-03 | El dashboard lista todos los productos separados por categoría | Cursada |
| RF-A-04 | El admin puede dar de alta nuevos productos con imagen | Cursada |
| RF-A-05 | El admin puede modificar productos existentes | Cursada |
| RF-A-06 | El admin puede dar de baja productos (baja lógica) con confirmación modal | Cursada |
| RF-A-07 | El admin puede reactivar productos con confirmación modal | Cursada |
| RF-A-08 | El admin puede descargar el listado de ventas en formato Excel | Cursada |
| RF-A-09 | El sistema registra logs de inicio de sesión de administradores | Final |
| RF-A-10 | Existe una pantalla de registros con top 10 productos más vendidos | Final |
| RF-A-11 | Existe una pantalla de registros con top 10 ventas más caras | Final |
| RF-A-12 | El admin puede ver los logs de login | Final |
| RF-A-13 | El admin puede descargar las encuestas en Excel | Final |

## 1.3. Módulo Sistema (Backend API)

| ID | Requerimiento | Cursada / Final |
|----|---------------|-----------------|
| RF-S-01 | El sistema expone una API REST que responde en formato JSON | Cursada |
| RF-S-02 | La API soporta operaciones de alta, baja, modificación y listado de productos | Cursada |
| RF-S-03 | El sistema persiste ventas con nombre del cliente, fecha y precio total | Cursada |
| RF-S-04 | La relación entre ventas y productos es muchos a muchos | Cursada |
| RF-S-05 | El sistema permite la carga de imágenes al alta de productos | Cursada |
| RF-S-06 | Las contraseñas se almacenan encriptadas | Cursada |
| RF-S-07 | Los productos se devuelven paginados desde la API | Cursada |
| RF-S-08 | La creación de admins se hace vía endpoint de API | Cursada |
| RF-S-09 | El sistema valida todos los datos entrantes mediante middlewares | Cursada |
| RF-S-10 | El sistema devuelve el listado de ventas con sus productos asociados | Cursada |

---

# 2. Requerimientos no funcionales (RNF)

Características de calidad del sistema. No describen funciones, describen cómo el sistema se comporta.

## 2.1. Performance y escalabilidad

| ID | Requerimiento | Cómo se cumple |
|----|---------------|----------------|
| RNF-PERF-01 | Los listados de productos no deben cargar más de 8-12 items por página | Paginación en backend (limit/offset con Sequelize) |
| RNF-PERF-02 | Las imágenes de productos deben tener un peso máximo controlado | Validación en multer (max 2MB) |
| RNF-PERF-03 | Las consultas con relaciones (ventas + productos) no deben hacer N+1 queries | Eager loading con `include` de Sequelize |

## 2.2. Seguridad

| ID | Requerimiento | Cómo se cumple |
|----|---------------|----------------|
| RNF-SEC-01 | Las contraseñas nunca se almacenan en texto plano | Hash con bcrypt (10 rounds) |
| RNF-SEC-02 | Las rutas del backoffice requieren autenticación | Middleware verificador de sesión/JWT |
| RNF-SEC-03 | Los datos entrantes se validan antes de procesarlos | express-validator en cada endpoint |
| RNF-SEC-04 | El sistema previene ataques de SQL injection | Uso de ORM (Sequelize) con queries parametrizadas |
| RNF-SEC-05 | Los uploads de archivos validan tipo MIME y tamaño | multer con fileFilter y limits |
| RNF-SEC-06 | El frontend se comunica con el backend respetando CORS | Middleware cors configurado con origen específico |

## 2.3. Usabilidad

| ID | Requerimiento | Cómo se cumple |
|----|---------------|----------------|
| RNF-USA-01 | La aplicación debe ser responsive (mobile y desktop) | CSS plano con media queries (mobile-first, breakpoints en 768px y 1024px) |
| RNF-USA-02 | Toda la navegación se hace mediante botones, no escribiendo URLs | Componentes de navegación contextual en cada pantalla |
| RNF-USA-03 | El cliente puede cambiar entre tema claro y oscuro | Variables CSS + localStorage |
| RNF-USA-04 | Los formularios muestran mensajes de error claros | Manejo de errores del backend + display en cliente |
| RNF-USA-05 | El sistema da feedback visual a las acciones del usuario | Toasts, modales, loaders |
| RNF-USA-06 | El testing por parte del cliente debe ser eficiente | Botón de acceso rápido en login |

## 2.4. Mantenibilidad

| ID | Requerimiento | Cómo se cumple |
|----|---------------|----------------|
| RNF-MNT-01 | El código sigue una estructura MVC reconocible | Carpetas: models, controllers, services, routes, middlewares, views |
| RNF-MNT-02 | La lógica de negocio se separa del manejo HTTP | Capa de services entre controllers y models |
| RNF-MNT-03 | Las configuraciones sensibles no están hardcodeadas | Variables de entorno con dotenv |
| RNF-MNT-04 | El proyecto tiene documentación mínima para correrse | README con setup, variables, credenciales |
| RNF-MNT-05 | Ambos integrantes contribuyen a ambos proyectos | Commits balanceados, PRs cruzados (revisable por los profes) |

## 2.5. Portabilidad

| ID | Requerimiento | Cómo se cumple |
|----|---------------|----------------|
| RNF-PORT-01 | El proyecto debe correrse en cualquier máquina sin instalar dependencias manualmente | docker-compose con servicios `mysql`, `backend` y `frontend` |
| RNF-PORT-02 | La BD debe poder reconstruirse desde cero | Sequelize `sync()` al arrancar + seeders ejecutables vía `docker-compose exec backend npm run seed` |
| RNF-PORT-03 | Los uploads no rompen al cambiar de entorno | Path relativo configurable por variable de entorno |

## 2.6. Confiabilidad

| ID | Requerimiento | Cómo se cumple |
|----|---------------|----------------|
| RNF-CONF-01 | Las operaciones de venta son atómicas (todo o nada) | Transacciones de Sequelize en VentaService.crear |
| RNF-CONF-02 | El total de la venta no puede ser manipulado desde el cliente | Cálculo del total siempre en backend |
| RNF-CONF-03 | El precio histórico de una venta no cambia si se modifica el producto | Snapshot de precio en VentaProducto.precio_unitario |
| RNF-CONF-04 | Los errores no se silencian | Middleware central de manejo de errores con logging |

---

# 3. Stack tecnológico

Cada tecnología elegida, por qué la usamos, qué requerimiento cumple y cómo se implementa.

## 3.1. Backend

### Node.js + Express
**Qué es:** Runtime de JavaScript del lado del servidor y su framework web minimalista.
**Por qué:** Es el stack que pide explícitamente el enunciado ("Configurar un servidor en Node.js utilizando Express").
**Objetivo en el TP:** Servir tanto la API REST como las vistas EJS del backoffice desde el mismo servidor.
**Implementación:** Aplicación Express con dos grupos de rutas: `/api/*` que responde JSON y `/admin/*` que renderiza EJS.

### Sequelize (ORM)
**Qué es:** Object Relational Mapper para Node.js compatible con MySQL.
**Por qué:** El enunciado pide explícitamente "Utilizar un ORM". Sequelize es el más maduro del ecosistema Node.
**Objetivo en el TP:** Modelar las entidades (Producto, Venta, Usuario, etc.), gestionar relaciones (la M:N entre Venta y Producto que pide el TP), y prevenir SQL injection.
**Implementación:** Modelos en `/models/*.js` con `define()`, relaciones con `belongsTo` / `hasMany` / `belongsToMany`. Migraciones y seeders para datos de prueba.

### MySQL
**Qué es:** Motor de base de datos relacional.
**Por qué:** Es la BD que figura en el sketch original del TP y la más común en este nivel de cursada.
**Objetivo en el TP:** Persistir productos, usuarios, ventas, encuestas y logs.
**Implementación:** Base de datos `lavadero_db` con tablas creadas por Sequelize. Schema definido en migraciones.

### EJS (Embedded JavaScript Templates)
**Qué es:** Motor de plantillas para renderizado server-side de HTML.
**Por qué:** El enunciado lo pide explícitamente para el backoffice.
**Objetivo en el TP:** Renderizar el panel administrativo del lado del servidor (login, dashboard, alta, edición, registros).
**Implementación:** Vistas en `/views/admin/*.ejs` con un layout común y partials reutilizables (header, nav, footer).

### bcrypt
**Qué es:** Librería de hash de contraseñas con salt.
**Por qué:** El enunciado pide "contraseñas encriptadas". bcrypt es el estándar de facto.
**Objetivo en el TP:** Cumplir RF-S-06 (almacenamiento seguro de credenciales).
**Implementación:** Hook `beforeSave` en el modelo Usuario que hashea el password con 10 rounds. Método `verificarPassword()` en el modelo para comparar.

### multer
**Qué es:** Middleware de Express para manejar uploads de archivos multipart/form-data.
**Por qué:** Necesario para el alta de productos con imagen (RF-A-04) y para el upload de imagen en encuestas (RF-C-16).
**Objetivo en el TP:** Recibir y guardar archivos en el servidor de forma segura.
**Implementación:** Configurado en `/middlewares/upload.js` con destino `/uploads`, nombre único basado en timestamp + random, filtro de MIME types (jpg, png, webp) y límite de 2MB.

### express-validator
**Qué es:** Conjunto de middlewares para validar el body, query y params de las requests.
**Por qué:** El enunciado pide "validar todos los datos que recibe a través de middlewares".
**Objetivo en el TP:** Cumplir RF-S-09 sin escribir validación manual en cada controller.
**Implementación:** Validadores por entidad en `/middlewares/validators/`. Cada ruta protegida usa el validador correspondiente antes del controller.

### exceljs
**Qué es:** Librería para generar archivos .xlsx desde Node.
**Por qué:** El enunciado pide "descargar el listado de ventas en excel" (RF-A-08) y, en final, las encuestas (RF-A-13).
**Objetivo en el TP:** Generar archivos Excel descargables desde el backoffice.
**Implementación:** Endpoint que consulta ventas, arma el workbook con headers estilizados y devuelve el archivo con headers HTTP de descarga.

### express-session (o JWT)
**Qué es:** Manejo de sesiones para autenticación.
**Por qué:** Necesario para proteger las rutas del backoffice (RNF-SEC-02).
**Objetivo en el TP:** Recordar al admin entre requests sin pedirle login en cada pantalla.
**Implementación recomendada:** express-session con cookie. Más simple para EJS que JWT (que es ideal para SPAs). Se podría usar JWT solo en la parte API si el frontend lo requiere.

### cors
**Qué es:** Middleware para configurar CORS (Cross-Origin Resource Sharing).
**Por qué:** El frontend corre en otro puerto que el backend; sin CORS, las requests fallan.
**Objetivo en el TP:** Permitir comunicación segura entre frontend y backend.
**Implementación:** Middleware `cors()` con origen específico configurado por variable de entorno (`FRONTEND_URL`).

### dotenv
**Qué es:** Carga variables de entorno desde un archivo `.env`.
**Por qué:** Cumple RNF-MNT-03 (no hardcodear configuraciones).
**Objetivo en el TP:** Mantener credenciales de BD, secrets de JWT, URLs y demás configurables y fuera del repo.
**Implementación:** `.env` en `.gitignore`, `.env.example` versionado con la estructura.

## 3.2. Frontend

> **Restricción académica:** en la materia Programación III solo se ve HTML, CSS y JavaScript vanilla (no se cubre React, Vue, Angular ni ningún framework de UI). Por eso el frontend usa solo esos tres lenguajes.

El frontend es **estático**: un conjunto de archivos `.html`, `.css` y `.js` que sirve nginx desde un contenedor. El navegador del cliente carga el HTML, ejecuta el JS, y el JS llama a la API del backend con `fetch`. **No hay build step, no hay bundler.**

### HTML5 multi-página
**Qué es:** Múltiples archivos `.html` separados, una pantalla = un archivo (`index.html` = bienvenida, `productos.html`, `carrito.html`, `ticket.html`, etc.).
**Por qué:** El enunciado pide que las pantallas sean navegables entre archivos por botones (no modales). Multi-página es la forma natural de cumplirlo sin SPA.
**Objetivo en el TP:** Implementar las pantallas del flujo cliente como archivos HTML separados, navegables con `<a href="otra.html">` y `window.location.href` desde JS.

### CSS plano con variables
**Qué es:** Estilos en archivos `.css` cargados desde el `<head>` de cada HTML. Sin preprocesadores, sin frameworks.
**Por qué:** Cumple RNF-USA-01 (responsive) con media queries y RNF-USA-03 (temas claro/oscuro) con variables CSS y un toggle que cambia el data-attribute del `<html>`.
**Implementación:** Archivo `base.css` con variables y reset, `components.css` con clases reutilizables (botones, cards, modal), `theme.css` con el dark mode. Mobile-first con breakpoints en 768px y 1024px.

### JavaScript vanilla con módulos
**Qué es:** Archivos `.js` cargados con `<script src="js/...js"></script>` desde cada HTML. Funciones reutilizables exportadas como módulos ES (`type="module"`).
**Por qué:** Es lo que se enseña en la materia. Mantenemos la lógica simple y testeable.
**Implementación:** Un JS por página (`productos.js`, `carrito-page.js`, etc.) que orquesta el DOM, más módulos compartidos:
- `api.js` — wrapper de `fetch` que centraliza la URL base y el manejo de errores.
- `carrito.js` — funciones puras de carrito (agregar, quitar, total) que leen/escriben en `sessionStorage`.
- `tema.js` — toggle claro/oscuro y persistencia en `localStorage`.
- `nav.js` — funciones helper para render del header y barra de navegación.

### fetch nativo
**Qué es:** API HTTP nativa del navegador.
**Por qué:** Es JavaScript estándar — no se importa nada. Cumple lo que el frontend necesita sin agregar dependencias.
**Implementación:** Un wrapper en `api.js` con funciones `get(path)`, `post(path, body)`, `postForm(path, formData)` que normalizan headers, JSON encoding y manejo de errores.

### sessionStorage para estado del cliente
**Qué es:** Storage del navegador con scope de pestaña.
**Por qué:** Reemplaza el "estado global" que en React se haría con Context API. Persiste el carrito y el nombre del cliente mientras se navega entre `.html`, y se borra al cerrar la pestaña — perfecto para autoservicio.
**Implementación:** Funciones en `carrito.js` que serializan/deserializan JSON desde `sessionStorage` en cada operación.

### jsPDF (vía CDN)
**Qué es:** Librería para generar PDFs del lado del cliente.
**Por qué:** El enunciado pide descargar el ticket en PDF (RF-C-10).
**Objetivo en el TP:** Generar el archivo PDF del ticket directamente en el navegador.
**Implementación:** Cargado por `<script>` desde un CDN público en `ticket.html`. El JS de la página invoca `jsPDF` para armar el documento al hacer click en "Descargar".

### Vitest + jsdom (solo en dev)
**Qué es:** Test runner moderno + simulación de DOM en Node.
**Por qué:** Permite testear los módulos JS del frontend sin abrir un navegador. Es lo que reemplaza React Testing Library en un setup vanilla.
**Implementación:** `vitest.config.js` con `environment: 'jsdom'`. Tests en `frontend/tests/*.test.js` que importan los módulos y los ejercitan. Para piezas con DOM, se carga un fragment HTML en `document.body` y se asertan los efectos del JS sobre ese DOM.

## 3.3. Infraestructura

### Docker + docker-compose
**Qué es:** Plataforma de contenedores + orquestador local.
**Por qué:** El enunciado pide que el sistema sea fácil de levantar por los testers (profesores). Con docker-compose, un solo comando levanta MySQL, backend y frontend — el tester no instala nada (salvo Docker Desktop).
**Objetivo en el TP:** Cumplir RNF-PORT-01 (correrse en cualquier máquina) sin pedirle al tester que instale Node, MySQL ni configure usuarios.
**Implementación:** `docker-compose.yml` en la raíz con tres servicios:
- `mysql` (imagen oficial `mysql:8`) con volume `mysql_data` para persistir entre reinicios.
- `backend` (Dockerfile propio basado en `node:18-alpine`) que depende de `mysql`.
- `frontend` (Dockerfile propio basado en `nginx:alpine`) que sirve `public/` como estáticos.

### nginx (alpine)
**Qué es:** Servidor web ligero.
**Por qué:** Necesitamos servir los archivos estáticos del frontend desde algún lado. nginx es la opción estándar y la imagen alpine es < 10 MB.
**Implementación:** Dockerfile `FROM nginx:alpine` que copia `frontend/public/` a `/usr/share/nginx/html`. Configuración default de nginx — no hacen falta proxies porque el JS llama directamente a `http://localhost:3000/api` y CORS lo permite.

---

# 4. Mapeo cruzado: tecnología ↔ requerimientos

Tabla para defender la elección tecnológica frente al profe.

| Tecnología | RF que satisface | RNF que satisface |
|------------|-------------------|--------------------|
| Express | RF-S-01, RF-S-02 | RNF-MNT-01 |
| Sequelize | RF-S-02, RF-S-04, RF-S-07, RF-S-10 | RNF-SEC-04, RNF-PERF-03 |
| MySQL | RF-S-03 | RNF-PORT-02 |
| EJS | RF-A-01 a RF-A-13 | RNF-MNT-01 |
| bcrypt | RF-S-06 | RNF-SEC-01 |
| multer | RF-A-04, RF-S-05, RF-C-16 | RNF-SEC-05 |
| express-validator | RF-S-09 | RNF-SEC-03 |
| exceljs | RF-A-08, RF-A-13 | — |
| HTML multi-página | RF-C-01 a RF-C-18 (pantallas del cliente) | RNF-USA-02 |
| fetch nativo | (todas las cliente↔server) | — |
| sessionStorage | RF-C-04, RF-C-05, RF-C-06, RF-C-11 (estado del carrito) | — |
| jsPDF (CDN) | RF-C-10 | — |
| cors | (todas las cliente↔server) | RNF-SEC-06 |
| dotenv | — | RNF-MNT-03 |
| docker-compose | — | RNF-PORT-01, RNF-MNT-04 |
| nginx (alpine) | (sirve estáticos del front) | RNF-PORT-01 |

---

# 5. Decisiones arquitectónicas clave

## 5.1. Arquitectura general

**Patrón:** Cliente-servidor con dos frontends consumiendo un mismo backend, todo orquestado por docker-compose.

```
┌─────────────────────────────────────────────────────────────────┐
│                    docker-compose                               │
│                                                                 │
│  [nginx (frontend)]   ──HTTP/JSON──►   [Express (backend)]      │
│   sirve HTML/CSS/JS                          │                  │
│   :8080                                      │                  │
│                                              ▼                  │
│                                       ──Sequelize──►            │
│                                              │                  │
│                                              ▼                  │
│                                          [MySQL]                │
│                                          :3306                  │
│                                                                 │
│  [Backoffice EJS] (mismo Express, ruta /admin/*)                │
│   render server-side, :3000                                     │
└─────────────────────────────────────────────────────────────────┘
```

**Justificación:** El enunciado pide explícitamente que "las partes backend deben estar alojadas en el mismo servidor", lo que indica un único servidor Express con dos responsabilidades (API JSON y vistas EJS). El frontend del cliente vive en otro contenedor con nginx y consume la API como cualquier cliente HTTP externo — JS vanilla con fetch.

## 5.2. Patrón de capas en backend

```
Routes  →  Controllers  →  Services  →  Models (Sequelize)
   │            │              │             │
   │            │              │             └─ Persistencia
   │            │              └─ Lógica de negocio (transacciones, cálculos)
   │            └─ Manejo HTTP (status codes, formato de respuesta)
   └─ Definición de endpoints y middlewares
```

**Justificación:** Separa responsabilidades. Los controllers no acceden a la BD directamente, los services no saben de HTTP. Facilita el testing y el cambio de tecnologías.

## 5.3. Patrón Repository (opcional)

Si el equipo se siente cómodo, se puede agregar una capa de Repository entre Service y Model para abstraer Sequelize. No es obligatorio y agrega complejidad. Para este TP no lo recomiendo.

## 5.4. Estrategia de manejo de errores

**Principio:** los errores burbujean hasta un middleware central, que decide el formato de respuesta (JSON para API, redirect para EJS) y el código HTTP.

```javascript
// Ejemplo conceptual
try { ... } catch (err) { next(err); }
// → middlewares/errorHandler.js maneja el resto
```

## 5.5. Estrategia de autenticación

**Recomendación:** session-based con `express-session` y cookie.
**Justificación:** El backoffice es server-rendered con EJS; las cookies son nativas a ese modelo. JWT sería redundante.
**Para la API:** misma sesión sirve si el frontend cliente está en el mismo dominio. Si está separado, agregar JWT solo para los endpoints públicos de la API.

## 5.6. Estructura de carpetas propuesta

```
autoservicio-lavadero-autos/
├── docker-compose.yml      ← orquesta mysql + backend + frontend
├── README.md
├── docs/
│
├── backend/
│   ├── Dockerfile
│   ├── src/
│   │   ├── app.js
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── controllers/
│   │   │   ├── productoController.js
│   │   │   ├── ventaController.js
│   │   │   ├── authController.js
│   │   │   └── adminViewController.js
│   │   ├── services/
│   │   │   └── ventaService.js
│   │   ├── models/
│   │   │   ├── index.js
│   │   │   ├── Producto.js
│   │   │   ├── Venta.js
│   │   │   └── ...
│   │   ├── routes/
│   │   │   ├── api/
│   │   │   └── admin/
│   │   ├── middlewares/
│   │   │   ├── auth.js
│   │   │   ├── upload.js
│   │   │   ├── errorHandler.js
│   │   │   └── validators/
│   │   └── views/          ← EJS del backoffice
│   │       ├── layouts/
│   │       ├── partials/
│   │       └── admin/
│   ├── seeders/
│   ├── tests/
│   ├── uploads/            ← (en .gitignore, montado como volume)
│   ├── .env                ← (en .gitignore)
│   ├── .env.example
│   ├── package.json
│   └── vitest.config.js
│
└── frontend/
    ├── Dockerfile          ← FROM nginx:alpine
    ├── public/             ← lo que sirve nginx
    │   ├── index.html      ← pantalla de bienvenida
    │   ├── productos.html
    │   ├── carrito.html
    │   ├── ticket.html
    │   ├── encuesta.html       (final ⭐)
    │   ├── producto-detalle.html (final ⭐)
    │   ├── css/
    │   │   ├── base.css        ← variables, reset
    │   │   ├── components.css  ← botones, cards, modal
    │   │   └── theme.css       ← claro/oscuro
    │   ├── js/
    │   │   ├── api.js          ← wrapper de fetch
    │   │   ├── carrito.js      ← lógica del carrito (sessionStorage)
    │   │   ├── tema.js         ← toggle de tema (localStorage)
    │   │   ├── nav.js          ← navegación entre pantallas
    │   │   ├── bienvenida.js   ← JS de index.html
    │   │   ├── productos.js
    │   │   ├── carrito-page.js
    │   │   ├── ticket.js
    │   │   └── encuesta.js     (final ⭐)
    │   └── assets/
    │       ├── logo.svg
    │       └── favicon.ico
    ├── tests/              ← Vitest + jsdom (corren fuera de Docker)
    │   ├── api.test.js
    │   ├── carrito.test.js
    │   └── ...
    ├── package.json        ← solo devDeps: vitest, jsdom
    └── vitest.config.js
```

---

# 6. Resumen ejecutivo

**El sistema cumple los requerimientos funcionales del enunciado mediante:**
- Una API REST construida con Express y documentada por endpoints REST estándar
- Un backoffice server-rendered con EJS para los administradores
- Un frontend multi-página con HTML + CSS + JavaScript vanilla (consistente con lo visto en la cursada) que consume la API por `fetch`
- Una BD relacional MySQL accedida vía Sequelize con relaciones bien modeladas
- Toda la stack orquestada con docker-compose — el tester levanta el sistema con un único comando

**Los requerimientos no funcionales se cubren mediante:**
- Seguridad: bcrypt, validación con express-validator, ORM contra SQL injection, CORS
- Mantenibilidad: arquitectura en capas (MVC + Services), variables de entorno
- Confiabilidad: transacciones en operaciones críticas, snapshot de precios, cálculo de totales server-side
- Usabilidad: responsive design con CSS plano, temas claro/oscuro persistentes (localStorage), navegación por botones entre archivos HTML
- Portabilidad: dockerización completa, no se requiere instalar Node ni MySQL en la máquina del tester

**Esta separación permite:**
- Defender cada elección tecnológica frente a los profes
- Documentar el sistema en el README
- Tener trazabilidad entre lo que pide el enunciado y cómo se implementa
