import { Router } from 'express';
import { listar } from '../../controllers/categoriaController.js';

const router = Router();

router.get('/', listar);

export default router;
