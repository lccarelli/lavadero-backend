import { Router } from 'express';
import authRouter from './auth.js';
import categoriasRouter from './categorias.js';
import productosRouter from './productos.js';
import usuariosRouter from './usuarios.js';
import ventasRouter from './ventas.js';
import encuestasRouter from './encuestas.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/categorias', categoriasRouter);
router.use('/productos', productosRouter);
router.use('/usuarios', usuariosRouter);
router.use('/ventas', ventasRouter);
router.use('/encuestas', encuestasRouter);

export default router;
