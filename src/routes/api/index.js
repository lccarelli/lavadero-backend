import { Router } from 'express';
import categoriasRouter from './categorias.js';
import productosRouter from './productos.js';

const router = Router();

router.use('/categorias', categoriasRouter);
router.use('/productos', productosRouter);

export default router;
