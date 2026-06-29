import { Router } from 'express';
import { requireAdmin } from '../../middlewares/requireAdmin.js';
import { Producto, Categoria } from '../../models/index.js';

const router = Router();

// Las vistas solo renderizan; el alta/edición se postea por fetch a la API
// (POST/PUT /api/productos), reusando el controller de productos.

// GET /admin/dashboard - lista todos los productos con su categoría.
router.get('/dashboard', requireAdmin, async (req, res, next) => {
  try {
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

// GET /admin/productos/nuevo - vista del form de alta
router.get('/productos/nuevo', requireAdmin, async (req, res, next) => {
  try {
    const categorias = await Categoria.findAll({ order: [['id', 'ASC']] });
    res.render('admin/producto-form', { usuario: req.session.usuario, producto: null, categorias });
  } catch (err) { next(err); }
});

// GET /admin/productos/:id/editar - vista del form de edición
router.get('/productos/:id/editar', requireAdmin, async (req, res, next) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (!producto) return res.redirect('/admin/dashboard');
    const categorias = await Categoria.findAll({ order: [['id', 'ASC']] });
    res.render('admin/producto-form', { usuario: req.session.usuario, producto, categorias });
  } catch (err) { next(err); }
});

export default router;
