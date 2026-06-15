import { Router } from 'express';
import { listar } from '../../controllers/productoController.js';

const router = Router();

router.get('/', listar);

export default router;
