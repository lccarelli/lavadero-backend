import { Router } from 'express';
import {
  listar,
  obtenerProducto,
  crear,
  actualizar,
  activar,
  desactivar,
} from '../../controllers/productoController.js';
import { requireAdmin } from '../../middlewares/requireAdmin.js';
import { subirImagenProducto } from '../../middlewares/upload.js';
import { reglasProducto, validarProducto } from '../../middlewares/validarProducto.js';

const router = Router();

router.get('/', listar);
router.get('/:id', obtenerProducto);

// Escritura: solo admin. La imagen viaja como multipart en el campo "imagen".
// Orden: auth -> multer (llena req.body/req.file) -> validación -> controller.
router.post('/', requireAdmin, subirImagenProducto, reglasProducto, validarProducto, crear);
router.put('/:id', requireAdmin, subirImagenProducto, reglasProducto, validarProducto, actualizar);
router.patch('/:id/activar', requireAdmin, activar);
router.patch('/:id/desactivar', requireAdmin, desactivar);

export default router;
