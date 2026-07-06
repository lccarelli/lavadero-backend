import { Router } from 'express';
import { registrarVenta, obtenerVenta } from '../../controllers/ventaController.js';
import { reglasVenta, validarVenta } from '../../middlewares/validarVenta.js';

const router = Router();

// Validación de la venta (middleware de ruta) antes del controller.
router.post('/', reglasVenta, validarVenta, registrarVenta);
router.get('/:id', obtenerVenta);

export default router;
