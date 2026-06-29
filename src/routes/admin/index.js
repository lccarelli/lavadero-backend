import { Router } from 'express';
import { renderLogin, login, logout } from '../../controllers/authController.js';
import { requireAdmin } from '../../middlewares/requireAdmin.js';

const router = Router();

// GET /admin — si el usuario esta logeado redirige al dashboard, sino al login.
router.get('/', (req, res) => {
  res.redirect(req.session?.usuario ? '/admin/dashboard' : '/admin/login');
});

// Login del backoffice.
router.get('/login', renderLogin);
router.post('/login', login);
router.post('/logout', logout);

// get llama a .render() porque son vistas
// Dashboard protegido (placeholder; el CRUD completo es TK-F-04).
router.get('/dashboard', requireAdmin, (req, res) => {
  res.render('admin/dashboard', { usuario: req.session.usuario });
});

export default router;
