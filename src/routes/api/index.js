import { Router } from 'express';
import categoriasRouter from './categorias.js';

const router = Router();

router.use('/categorias', categoriasRouter);

export default router;
