import { Router } from 'express';
import { registroAdmin, loginApi } from '../../controllers/authController.js';

const router = Router();

router.post('/registro-admin', registroAdmin);
router.post('/login', loginApi);

export default router;
