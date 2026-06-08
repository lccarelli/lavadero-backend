# Backend - Lavadero Autoservicio

API REST + Backoffice EJS para el TP integrador.

> El proyecto vive en **dos repos**: `lavadero-backend` (este) y `lavadero-frontend`.
> El backoffice (EJS) lo renderiza este backend; el frontend del cliente es vanilla
> y lo sirve nginx. El `docker-compose.yml` (acá) orquesta ambos + MySQL.

## Levantar todo con Docker

Cloná ambos repos como carpetas hermanas:

```
tp-lavadero/
├── lavadero-backend/    <- este repo (acá está el docker-compose.yml)
└── lavadero-frontend/
```

Luego, desde `lavadero-backend/`:

```bash
cp .env.example .env
docker-compose up --build
```

- Frontend: http://localhost:8080
- API: http://localhost:3000/api
- Backoffice: http://localhost:3000/admin/login
- MySQL: localhost:3306

## Setup (tests fuera de Docker)

```bash
npm install
cp .env.example .env
# Editar .env con credenciales de MySQL
```

## Comandos

```bash
npm run dev          # Desarrollo con auto-reload
npm start            # Producción
npm test             # Correr tests una vez
npm run test:watch   # Tests en modo watch
npm run seed         # Poblar BD con datos de prueba
```

## Estructura

```
src/
├── app.js              ← entry point
├── config/             ← config de BD, sesiones, multer
├── models/             ← modelos Sequelize
├── controllers/        ← lógica de los endpoints
├── routes/             ← definición de rutas
├── middlewares/        ← auth, validators, upload, errores
├── views/              ← templates EJS del backoffice
├── public/             ← CSS/JS del backoffice
└── services/           ← lógica de negocio (transacciones, etc)
tests/                  ← tests con Vitest
seeders/                ← scripts para poblar la BD
uploads/                ← imágenes subidas (gitignored)
```

## Endpoints

### API (JSON)

```
GET    /api/productos           Listar (paginado)
GET    /api/productos/:id       Detalle
POST   /api/productos           Alta (admin)
PUT    /api/productos/:id       Modificar (admin)
PATCH  /api/productos/:id/activar
PATCH  /api/productos/:id/desactivar
GET    /api/categorias
POST   /api/ventas              Crear venta
GET    /api/ventas
POST   /api/encuestas           Crear encuesta (final)
POST   /api/auth/login
POST   /api/auth/registro-admin
POST   /api/auth/logout
```

### Backoffice (EJS)

```
GET    /admin/login
POST   /admin/login
GET    /admin/dashboard
GET    /admin/productos/alta
GET    /admin/productos/:id/editar
GET    /admin/registros         (final)
GET    /admin/ventas/excel
GET    /admin/encuestas/excel   (final)
```

## Credenciales de prueba

- Email: `admin@lavadero.com`
- Password: `admin123`
