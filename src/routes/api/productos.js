import { Router } from 'express';
import { listar, obtenerProducto } from '../../controllers/productoController.js';

const router = Router();

router.get('/', listar);
router.get('/:id', obtenerProducto);

export default router;
