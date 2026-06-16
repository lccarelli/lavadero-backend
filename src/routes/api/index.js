import { Router } from 'express';
import categoriasRouter from './categorias.js';
import productosRouter from './productos.js';
import usuariosRouter from './usuarios.js';

const router = Router();

router.use('/categorias', categoriasRouter);
router.use('/productos', productosRouter);
router.use('/usuarios', usuariosRouter);

export default router;
