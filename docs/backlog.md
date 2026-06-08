# Backlog TP Integrador Programación III
## Lavadero de autos - Autoservicio

**Convenciones:**
- 🎯 = Obligatorio para cursada (promoción)
- ⭐ = Requerimiento extra para fecha de final
- 🔧 = Tarea técnica / infraestructura (no funcional pero obligatoria)

---

# ÉPICA 1: Setup e infraestructura del proyecto

Objetivo: dejar ambos proyectos (frontend y backend) corriendo localmente con todas las dependencias configuradas y un esqueleto navegable.

## Feature 1.1: Configuración del proyecto backend 🔧

### CU 1.1.1: Inicializar proyecto Node.js + Express
- Crear `package.json` con scripts `start` y `dev` (nodemon)
- Instalar express, dotenv
- Configurar archivo `.env` con variables (DB, PORT, JWT_SECRET, UPLOAD_DIR)
- Estructura MVC de carpetas: `/models /controllers /services /routes /middlewares /views /public /uploads`

### CU 1.1.2: Configurar conexión a MySQL con Sequelize
- Instalar sequelize, mysql2
- Crear `/config/database.js` con conexión
- Configurar logging en dev, silencioso en prod
- Probar conexión al arrancar y mostrar mensaje claro si falla

### CU 1.1.3: Configurar motor de vistas EJS
- Instalar ejs
- Configurar `app.set('view engine', 'ejs')`
- Crear layout base con header/nav/footer reutilizable
- Configurar carpeta `/public` para assets estáticos

### CU 1.1.4: Configurar middlewares base
- express.json() y express.urlencoded()
- cors (configurado para el origen del frontend)
- multer para carga de archivos (ver feature 3.2)
- express-session o JWT para autenticación (ver épica 4)
- Middleware de manejo de errores centralizado

## Feature 1.2: Configuración del proyecto frontend 🔧

### CU 1.2.1: Estructura del proyecto frontend (HTML/CSS/JS vanilla)
- Crear carpeta `frontend/public/` con un `.html` por pantalla (`index.html`, `productos.html`, `carrito.html`, `ticket.html`, etc.)
- Crear carpeta `frontend/public/css/` con `base.css` (variables CSS, reset), `components.css` (botones, cards, modal) y `theme.css` (claro/oscuro)
- Crear carpeta `frontend/public/js/` con módulos compartidos: `api.js` (wrapper de fetch), `carrito.js` (estado del carrito en sessionStorage), `tema.js` (toggle de tema), `nav.js`
- Crear `frontend/public/assets/` con logo y favicon
- Crear `package.json` mínimo solo para dev (vitest + jsdom como devDeps); el código de producción no tiene build step
- **Restricción:** sin frameworks de UI (React/Vue/Angular), sin bundlers (Vite/Webpack), sin TypeScript

### CU 1.2.2: Branding global
- Definir nombre de la app (ej: "AutoLavado Express")
- Crear logo (puede ser texto estilizado o SVG)
- Configurar favicon
- Header con logo + nombre + nombres de integrantes incluido en TODAS las pantallas (vía función JS compartida en `nav.js` o por copy/paste consistente del bloque `<header>`)

### CU 1.2.3: Sistema de temas claro/oscuro 🎯
- Variables CSS para colores en `:root` (tema claro) y `[data-theme="dark"]` (tema oscuro)
- Toggle de tema en header que cambia el `data-theme` del `<html>`
- Persistir elección en localStorage
- Aplicar tema antes del primer render leyendo localStorage en un script en el `<head>`
- **Criterio:** al recargar, el tema elegido se mantiene

### CU 1.2.4: Barra de navegación persistente 🎯
- Siempre visible en todas las pantallas (incluida en el `<header>` compartido)
- Links `<a href="...html">` contextuales (según pantalla actual)
- Botón de acceso al login admin
- **Criterio:** el cliente nunca debe necesitar escribir una ruta a mano

## Feature 1.3: Dockerización 🔧

### CU 1.3.1: Dockerfile del backend
- Imagen base `node:18-alpine`
- Copiar `package.json` e instalar deps
- Copiar `src/`, `seeders/`
- Exponer puerto 3000
- Comando: `node src/app.js`

### CU 1.3.2: Dockerfile del frontend
- Imagen base `nginx:alpine`
- Copiar `frontend/public/` a `/usr/share/nginx/html`
- Exponer puerto 80 (mapeado al 8080 en el host)
- Sin configuración custom de nginx — config default alcanza para servir estáticos

### CU 1.3.3: docker-compose.yml
- Servicio `mysql` con imagen `mysql:8`, volume para persistencia, env vars desde `.env` (root password, db name)
- Servicio `backend` que builde el Dockerfile del backend, depends_on `mysql`, expone puerto 3000, monta `backend/uploads` como volume
- Servicio `frontend` que builde el Dockerfile del frontend, expone puerto 8080
- Documentar en README que el único requisito para los testers es Docker Desktop

### CU 1.3.4: Variables de entorno y `.env.example`
- `backend/.env.example` con `DB_HOST=mysql` (nombre del servicio del compose), `DB_USER`, `DB_PASSWORD`, `DB_NAME=lavadero_db`, `DB_PORT=3306`, `PORT=3000`, `FRONTEND_URL=http://localhost:8080`, `SESSION_SECRET=...`
- `.env` real ignorado por git
- El frontend NO necesita `.env` (la URL del backend está hardcodeada en `js/api.js` como `http://localhost:3000/api` — el navegador del cliente le pega al host, no al hostname interno del compose)

---

# ÉPICA 2: Modelo de datos y persistencia

Objetivo: schema de BD estable que soporte todas las operaciones del sistema.

## Feature 2.1: Diseño del schema 🎯

### CU 2.1.1: Modelo Categoria
- Campos: id (PK), nombre, descripcion
- Datos iniciales: "Lavados" y "Accesorios"

### CU 2.1.2: Modelo Producto
- Campos: id, nombre, descripcion, precio (DECIMAL), imagen (path), categoria_id (FK), activo (default true), timestamps
- Relación N:1 con Categoria

### CU 2.1.3: Modelo Usuario
- Campos: id, nombre, email (único), password (hash), es_admin, timestamps
- Hooks: hash automático de password antes de guardar

### CU 2.1.4: Modelo Venta
- Campos: id, nombre_usuario (string libre), fecha, precio_total, timestamps
- Relación M:N con Producto a través de VentaProducto

### CU 2.1.5: Modelo VentaProducto (pivot explícito)
- Campos: id, venta_id, producto_id, cantidad, precio_unitario (snapshot)
- **Importante:** guardar el precio al momento de la venta, no leerlo en runtime

### CU 2.1.6: Modelo Encuesta ⭐
- Campos: id, email, comentario, puntuacion (1-10), recomendaria (bool), imagen, fecha, venta_id (FK opcional)

### CU 2.1.7: Modelo LogLogin ⭐
- Campos: id, usuario_id, fecha, exitoso (bool), ip

## Feature 2.2: Datos de prueba (seeds)

### CU 2.2.1: Seed de categorías 🎯
- Insertar "Lavados" y "Accesorios"

### CU 2.2.2: Seed de productos variados 🎯
- Mínimo 10 productos activos (5 por categoría) para poder probar paginación
- Productos de ejemplo:
  - Lavados: Express, Completo, Premium, Detailing, Lavado de motor, Pulido de faros, Tratamiento tapizado
  - Accesorios: Shampoo, Cera, Microfibra, Aromatizante, Limpiavidrios, Abrillantador, Renovador de plástico

### CU 2.2.3: Seed de usuario admin 🎯
- Crear admin de prueba (admin@lavadero.com / admin123)
- Datos del botón de acceso rápido en el login

---

# ÉPICA 3: API REST de productos

Objetivo: API funcional que sirva todas las operaciones CRUD sobre productos con validación y paginación.

## Feature 3.1: Consulta de productos 🎯

### CU 3.1.1: Listar productos paginados
- Endpoint: `GET /api/productos?page=1&limit=8&categoria=&activo=`
- Devuelve: `{ data: [...], pagination: { page, limit, total, totalPages } }`
- Sin filtro `activo`: devuelve todos (admin); con `activo=true`: solo activos (cliente)

### CU 3.1.2: Obtener producto por ID
- Endpoint: `GET /api/productos/:id`
- 404 si no existe
- Incluir categoría en la respuesta

### CU 3.1.3: Listar categorías
- Endpoint: `GET /api/categorias`
- Usado por el frontend para mostrar las tabs/filtros

## Feature 3.2: Gestión CRUD de productos 🎯

### CU 3.2.1: Alta de producto con imagen
- Endpoint: `POST /api/productos` (multipart/form-data)
- Multer guarda imagen en `/uploads` con nombre único
- Validar: nombre obligatorio, precio > 0, categoria_id válido, imagen formato jpg/png/webp, tamaño max 2MB
- `activo = true` por defecto
- Requiere middleware de autenticación admin

### CU 3.2.2: Modificación de producto
- Endpoint: `PUT /api/productos/:id`
- Imagen opcional (si no se envía, se mantiene la anterior)
- Si se envía nueva, eliminar la anterior del disco
- Validar mismos campos que alta

### CU 3.2.3: Baja lógica de producto
- Endpoint: `PATCH /api/productos/:id/desactivar`
- Solo cambia `activo = false`
- El producto NO se elimina de la BD
- **Criterio:** el cliente deja de verlo inmediatamente

### CU 3.2.4: Reactivación de producto
- Endpoint: `PATCH /api/productos/:id/activar`
- Cambia `activo = true`

## Feature 3.3: Validaciones vía middleware 🎯

### CU 3.3.1: Middleware de validación de productos
- Usar express-validator
- Validaciones: nombre (string, min 3), precio (decimal > 0), categoria_id (existe en BD)
- Devolver errores en formato JSON estandarizado

### CU 3.3.2: Middleware de validación de imagen
- Validar mime type permitido
- Validar tamaño máximo
- Rechazar si no cumple antes de guardar

---

# ÉPICA 4: Autenticación y gestión de admins

Objetivo: que solo usuarios autenticados puedan acceder al backoffice y modificar productos.

## Feature 4.1: Registro de admin (vía API) 🎯

### CU 4.1.1: Endpoint de registro
- Endpoint: `POST /api/auth/registro-admin`
- Recibe: nombre, email, password
- Hash de password con bcrypt (10 rounds mínimo)
- Validar email único
- `es_admin = true` por defecto en este endpoint

## Feature 4.2: Login 🎯

### CU 4.2.1: Login vía API (JSON)
- Endpoint: `POST /api/auth/login`
- Recibe: email, password
- Verificar hash con bcrypt
- Devolver token JWT o setear cookie de sesión
- **Criterio:** password incorrecto devuelve 401 sin filtrar si el email existe o no

### CU 4.2.2: Login vía vista EJS
- Endpoint: `GET /admin/login` (form)
- Endpoint: `POST /admin/login` (procesa)
- En éxito: redirige a `/admin/dashboard`
- En error: muestra mensaje en la misma vista

### CU 4.2.3: Botón de acceso rápido 🎯
- Botón visible en pantalla de login
- Al hacer click, autocompleta email y password del admin de prueba
- **Justificación:** acelera el testing por parte de los profesores

### CU 4.2.4: Middleware de autenticación
- Verificar token/sesión en rutas protegidas
- Redirigir a login si no autenticado (vistas EJS)
- Devolver 401 si no autenticado (API)

### CU 4.2.5: Logout
- Endpoint que destruye sesión o invalida token
- Redirige a pantalla pública

---

# ÉPICA 5: Flujo de compra del cliente (frontend)

Objetivo: el cliente puede completar todo el flujo desde bienvenida hasta ticket sin necesidad de escribir rutas.

## Feature 5.1: Pantalla de bienvenida 🎯

### CU 5.1.1: Input de nombre
- Input obligatorio, mínimo 2 caracteres
- Botón "Continuar" deshabilitado si está vacío
- Persistir nombre en `sessionStorage` (clave `clienteNombre`) para leerlo desde las pantallas siguientes
- En cada pantalla del flujo, si no hay nombre en sessionStorage, redirigir a `index.html`
- **Criterio:** no se puede ver productos sin ingresar nombre

## Feature 5.2: Pantalla de productos 🎯

### CU 5.2.1: Visualización por categorías
- Tabs o filtros para alternar entre "Lavados" y "Accesorios"
- Mostrar nombre, imagen, precio, descripción de cada producto
- Solo productos con `activo = true`

### CU 5.2.2: Paginación
- Mostrar máximo 8 productos por página
- Controles de página anterior/siguiente
- Indicador de página actual

### CU 5.2.3: Diseño responsive
- Mobile-first
- Grid adaptable: 1 col mobile, 2 col tablet, 3-4 col desktop
- Imágenes con aspect ratio fijo

### CU 5.2.4: Agregar producto al carrito
- Botón "+" o "Agregar" en cada producto
- Si ya está en el carrito, suma cantidad
- Feedback visual al agregar (toast / badge)

### CU 5.2.5: Quitar producto desde la pantalla de productos
- Si un producto ya está en el carrito, mostrar también botón "-"
- Al llegar a 0, se elimina del carrito

### CU 5.2.6: Indicador de items en carrito
- Badge con cantidad total de items
- Visible siempre en header

## Feature 5.3: Pantalla de carrito 🎯

### CU 5.3.1: Listado de productos en carrito
- Mostrar cada producto con: imagen, nombre, precio unitario, cantidad, subtotal
- Mostrar total general
- Si el carrito está vacío: mensaje y botón "ver productos"

### CU 5.3.2: Modificar cantidades
- Botones +/- por cada producto
- Input numérico editable (con validación de mínimo 1)

### CU 5.3.3: Eliminar producto del carrito
- Botón "eliminar" en cada item
- Sin confirmación (es reversible volviendo a agregar)

### CU 5.3.4: Confirmar compra con modal
- Botón "Finalizar compra" abre modal
- Modal muestra resumen y pide confirmación
- Botones "confirmar" / "cancelar"

### CU 5.3.5: POST de la venta al backend
- Endpoint: `POST /api/ventas`
- Payload: `{ nombre_usuario, items: [{ producto_id, cantidad }] }`
- **Importante:** el total se calcula en backend, NO en frontend
- En éxito: redirigir a ticket con datos de la venta

## Feature 5.4: Pantalla de ticket 🎯

### CU 5.4.1: Mostrar ticket
- Datos: nombre de empresa, nombre del cliente, fecha actual, productos con cantidades y subtotales, total
- Estilo de ticket (puede usar font monoespaciada para verse "impreso")

### CU 5.4.2: Descargar ticket en PDF
- Botón "descargar PDF"
- Generar PDF en cliente con jsPDF o similar
- Nombre del archivo: `ticket-{fecha}-{nombre}.pdf`

### CU 5.4.3: Botón salir / reiniciar
- En cursada: vuelve a pantalla de bienvenida y limpia estado
- En final: redirige a pantalla de encuesta (ver épica 8)

---

# ÉPICA 6: Backoffice administrativo (EJS)

Objetivo: que el admin pueda gestionar productos completamente desde el panel renderizado por el servidor.

## Feature 6.1: Dashboard 🎯

### CU 6.1.1: Listado de productos
- Tabla con: imagen, nombre, categoría, precio, estado (activo/inactivo)
- Productos separados visualmente por tipo (o con filtro por categoría)
- Indicador visual de productos inactivos (color gris/strikethrough)

### CU 6.1.2: Acciones por producto
- Botón "Editar" → navega a pantalla edición
- Botón "Desactivar" (si está activo) → modal confirmación
- Botón "Activar" (si está inactivo) → modal confirmación

### CU 6.1.3: Botón "Agregar producto"
- Navega a pantalla de alta

### CU 6.1.4: Botón "Descargar ventas en Excel" 🎯
- Descarga archivo .xlsx con todas las ventas
- Incluir: id venta, nombre cliente, fecha, total, productos asociados

### CU 6.1.5: Botón "Ver registros" ⭐
- Navega a pantalla de registros (solo final)

## Feature 6.2: Alta y modificación de productos 🎯

### CU 6.2.1: Pantalla de alta
- Formulario con campos: nombre, descripción, precio, categoría (select), imagen (file input)
- Validación cliente y servidor
- Botón "Agregar" → POST y redirige a dashboard

### CU 6.2.2: Pantalla de edición (reutilizar alta)
- Misma vista pero con datos precargados
- Imagen actual visible, opción a reemplazar
- Botón "Guardar cambios"

### CU 6.2.3: Modales de confirmación
- Modal para baja: "¿Confirma desactivar el producto X?"
- Modal para activación: "¿Confirma activar el producto X?"
- Botones confirmar/cancelar

---

# ÉPICA 7: Reportes y exportación

Objetivo: que el admin pueda extraer datos del sistema.

## Feature 7.1: Exportación de ventas a Excel 🎯

### CU 7.1.1: Generar archivo .xlsx
- Usar librería `exceljs`
- Endpoint: `GET /admin/ventas/excel`
- Columnas: ID venta, Cliente, Fecha, Total, Productos (concatenados)
- Headers en negrita, formato de fecha legible

### CU 7.1.2: Endpoint API de listado de ventas con productos
- Endpoint: `GET /api/ventas`
- Incluir productos asociados (eager loading con Sequelize)
- Soportar paginación

## Feature 7.2: Exportación de encuestas a Excel ⭐

### CU 7.2.1: Generar archivo .xlsx de encuestas
- Endpoint: `GET /admin/encuestas/excel`
- Columnas: ID, Email, Puntuación, Recomendaría, Comentario, Fecha

---

# ÉPICA 8: Encuestas (final) ⭐

Objetivo: capturar feedback del cliente después de cada compra.

## Feature 8.1: Pantalla de encuesta ⭐

### CU 8.1.1: Redirigir desde ticket
- Botón "salir" del ticket → pantalla de encuesta (no a bienvenida)

### CU 8.1.2: Formulario con 5 tipos de input
- **textarea**: comentario libre
- **email**: contacto del cliente
- **checkbox**: "¿Recomendaría el servicio?"
- **slider** (range): puntuación 1-10
- **file**: foto del auto lavado (opcional)

### CU 8.1.3: Validaciones
- Email con formato válido
- Comentario mínimo 10 caracteres si se completa
- Slider valor entre 1 y 10
- Imagen formato válido y tamaño máximo
- Mensajes de error visibles bajo cada campo

### CU 8.1.4: Upload de imagen al servidor
- Endpoint: `POST /api/encuestas` (multipart)
- Guardar imagen en `/uploads/encuestas`
- Asociar a la encuesta

### CU 8.1.5: Botón "omitir"
- Visible pero con estilo secundario (no resaltado como el "enviar")
- Al hacer click: redirige a bienvenida sin guardar

### CU 8.1.6: Modal de agradecimiento
- Al enviar exitosamente: modal "Gracias por tu feedback"
- Botón "Volver al inicio"
- Persistir encuesta en BD con fecha actual

## Feature 8.2: Pantalla de detalle de producto ⭐

### CU 8.2.1: Ruta dinámica de detalle
- Ruta: `/productos/:id`
- Tomar id de los params
- Llamar a `GET /api/productos/:id`
- Mostrar todos los datos del producto + imagen grande

### CU 8.2.2: Botón "agregar al carrito" desde detalle
- Misma lógica que en la pantalla de productos

---

# ÉPICA 9: Registros y auditoría (final) ⭐

Objetivo: dar visibilidad al admin sobre el uso del sistema.

## Feature 9.1: Logs de login ⭐

### CU 9.1.1: Registrar cada intento de login
- En cada POST de login (exitoso o fallido), crear registro en `logs_login`
- Guardar: usuario_id (si existe), fecha, exitoso, ip del request

### CU 9.1.2: Vista de logs en panel admin
- Pantalla `/admin/registros`
- Tabla con últimos 50 logins
- Columnas: fecha, usuario (o "email no registrado"), éxito, IP

## Feature 9.2: Estadísticas ⭐

### CU 9.2.1: Top 10 productos más vendidos
- Query con JOIN entre ventas_productos y productos
- Sumar cantidades agrupado por producto
- Ordenar descendente, limitar a 10

### CU 9.2.2: Top 10 ventas más caras
- Query ordenando por precio_total desc, limit 10
- Incluir cliente y productos

### CU 9.2.3: Estadística extra 1 - Ventas por categoría
- Total facturado por cada categoría

### CU 9.2.4: Estadística extra 2 - Promedio de puntuación de encuestas
- AVG de puntuación
- Cantidad de encuestas respondidas vs omitidas

### CU 9.2.5: Botón "Descargar encuestas en Excel"
- En la pantalla de registros (ver Feature 7.2)

---

# ÉPICA 10: Calidad, entrega y documentación

## Feature 10.1: Estilos y diseño 🎯

### CU 10.1.1: Diseño responsive en todas las pantallas
- Probar en mobile (375px), tablet (768px), desktop (1280px)
- Sin scroll horizontal en ninguna resolución

### CU 10.1.2: Criterio estético consistente
- Paleta de colores definida (claro y oscuro)
- Tipografía coherente
- Espaciado y jerarquía visual claros

## Feature 10.2: Documentación 🔧

### CU 10.2.1: README de cada repo
- Instrucciones de instalación
- Variables de entorno necesarias
- Comandos para correr el proyecto
- Credenciales del admin de prueba

### CU 10.2.2: Colección de Postman / Thunder Client
- Todos los endpoints documentados
- Variables de entorno para token

## Feature 10.3: Git workflow 🔧

### CU 10.3.1: Repositorios separados
- Un repo frontend, un repo backend (en cuentas individuales o grupales)

### CU 10.3.2: Commits balanceados entre integrantes
- **Requisito explícito del enunciado**: ambos integrantes deben tener commits en ambos proyectos
- Estrategia sugerida: pair programming con commits alternados, o dividir features y revisar PRs entre sí

### CU 10.3.3: Branching mínimo
- Branch `main` protegida
- Branches por feature (`feature/login-admin`, `feature/carrito`, etc.)
- PRs con review del compañero antes de mergear

---

# Resumen y plan de ataque sugerido

## Orden recomendado de implementación (para no trabarse)

**Sprint 1 - Cimientos (semana 1-2)**
- Épica 1: Setup completo
- Épica 2: Modelo de datos + seeds

**Sprint 2 - Backend funcional (semana 2-3)**
- Épica 3: API REST de productos
- Épica 4: Autenticación

**Sprint 3 - Cliente (semana 3-4)**
- Épica 5: Flujo completo del cliente (bienvenida → ticket)

**Sprint 4 - Backoffice (semana 4-5)**
- Épica 6: Backoffice EJS
- Épica 7: Reportes

**Sprint 5 - Extras de final + pulido (semana 5-6)**
- Épica 8: Encuestas y detalle
- Épica 9: Registros y estadísticas
- Épica 10: Documentación final

## Total estimado

- **Casos de uso obligatorios (cursada)**: ~55
- **Casos de uso extras (final)**: ~15
- **Casos técnicos / infra**: ~10
- **Total**: ~80 casos de uso

---

## Riesgos a vigilar (de mi experiencia)

1. **Subida de imágenes**: Multer + servir archivos estáticos suele dar dolores de cabeza con paths. Resolver temprano.
2. **Cálculo del total**: hacerlo siempre en backend. Si lo hacés en frontend, el profe te lo va a romper enviando precios manipulados.
3. **Baja lógica**: asegurarse que el filtro `activo=true` se aplique en TODOS los endpoints que consume el cliente.
4. **Persistencia del carrito**: vive en `sessionStorage` (no localStorage). Esto persiste el carrito entre pantallas del flujo pero se borra al cerrar la pestaña — coherente con autoservicio (NO e-commerce). El módulo `carrito.js` centraliza el acceso para no repetir `JSON.parse` por todos lados.
5. **Snapshot de precio en VentaProducto**: si no guardás el precio al momento de la venta, los tickets viejos van a cambiar cuando modifiques precios. Pequeño detalle que pesa en defensa.
6. **CORS**: configurarlo correctamente desde el principio, no al final.
7. **Commits balanceados**: el enunciado lo dice explícitamente y advierte penalizaciones individuales. Llevar registro.
