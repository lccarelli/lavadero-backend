import { Router } from 'express';
import { registrarVenta, obtenerVenta } from '../../controllers/ventaController.js';

const router = Router();

router.post('/', registrarVenta);
router.get('/:id', obtenerVenta);

export default router;
