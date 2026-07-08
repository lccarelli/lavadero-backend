import { Router } from 'express';
import { requireAdmin } from '../../middlewares/requireAdmin.js';

const router = Router();

// GET /admin/usuarios/nuevo - vista del form de alta de administrador.
// La vista solo renderiza; el alta se postea por fetch a POST /api/auth/registro-admin.
router.get('/usuarios/nuevo', requireAdmin, (req, res) => {
  res.render('admin/usuario-form', { usuario: req.session.usuario });
});

export default router;
