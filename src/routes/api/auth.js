import { Router } from 'express';
import { registroAdmin, loginApi } from '../../controllers/authController.js';
import { requireAdmin } from '../../middlewares/requireAdmin.js';
import { reglasRegistroAdmin, validarRegistroAdmin } from '../../middlewares/validarRegistroAdmin.js';

const router = Router();

// Crear admin: solo un admin logueado puede crear otros (requireAdmin) + validación.
router.post('/registro-admin', requireAdmin, reglasRegistroAdmin, validarRegistroAdmin, registroAdmin);
router.post('/login', loginApi);

export default router;
