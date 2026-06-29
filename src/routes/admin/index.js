import { Router } from 'express';
import { renderLogin, login, logout } from '../../controllers/authController.js';
import { requireAdmin } from '../../middlewares/requireAdmin.js';
import { Producto, Categoria } from '../../models/index.js';

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
// Dashboard: lista todos los productos con su categoría.
router.get('/dashboard', requireAdmin, async (req, res, next) => {
  try {
    //obtiene productos con sequalize
    const productos = await Producto.findAll({
      include: [{ model: Categoria, as: 'categoria', attributes: ['nombre'] }],
      order: [['id', 'ASC']],
    });
    // Una tabla para "Lavados", "accesorios y otros" va a la otra.
    const lavados = productos.filter((p) => p.categoria?.nombre === 'Lavados');
    const otros = productos.filter((p) => p.categoria?.nombre !== 'Lavados');
    res.render('admin/dashboard', { usuario: req.session.usuario, lavados, otros });
  } catch (err) {
    next(err);
  }
});

export default router;
