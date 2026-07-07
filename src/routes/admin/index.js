import { Router } from 'express';
import { renderLogin, login, logout } from '../../controllers/authController.js';
import productosRouter from './productos.js';
import usuariosRouter from './usuarios.js';

const router = Router();

// GET /admin - si el usuario esta logeado redirige al dashboard, sino al login.
router.get('/', (req, res) => {
  res.redirect(req.session?.usuario ? '/admin/dashboard' : '/admin/login');
});

// Login del backoffice.
router.get('/login', renderLogin);
router.post('/login', login);
router.post('/logout', logout);

// Rutas de producto del backoffice (dashboard, alta, edición).
router.use(productosRouter);
// Ruta de alta de administrador del backoffice.
router.use(usuariosRouter);

export default router;
