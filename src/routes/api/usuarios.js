import { Router } from 'express';
import { crearUsuario } from '../../controllers/usuarioController.js';

const router = Router();

router.post('/', crearUsuario);

export default router;
