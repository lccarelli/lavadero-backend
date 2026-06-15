import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import apiRoutes from './routes/api/index.js';
import { testConnection } from './config/database.js';
import { syncDatabase } from './models/index.js';
import { warmup } from './config/warmup.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares base
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:8080',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Vistas EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Archivos estáticos
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Health check (para verificar que arranca)
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// TODO: rutas API y admin (se agregan en tickets posteriores)
app.use('/api', apiRoutes);
// app.use('/admin', adminRoutes);

// Middleware central de errores
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Error interno del servidor',
  });
});

// Arranque: valida la conexión a MySQL, sincroniza las tablas y asegura los
// datos base (categorías). Recién después escucha. Así la API funciona en un
// arranque limpio, sin depender de un seed manual.
const start = async () => {
  await testConnection();
  await syncDatabase();
  await warmup();
  app.listen(PORT, () => {
    console.log(`Backend corriendo en http://localhost:${PORT}`);
  });
};

// No arranca al importar app.js en los tests (Vitest setea NODE_ENV='test').
if (process.env.NODE_ENV !== 'test') {
  start();
}

export default app;
