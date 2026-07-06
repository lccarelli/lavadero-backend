import { Router } from 'express';
import { crearEncuesta } from '../../controllers/encuestaController.js';
import { subirImagenEncuesta } from '../../middlewares/uploadEncuesta.js';
import { reglasEncuesta, validarEncuesta } from '../../middlewares/validarEncuesta.js';

const router = Router();

// Pública: la encuesta la deja el cliente tras la compra. Imagen opcional (multipart).
// Orden: multer (llena req.body/req.file) -> validación -> controller.
router.post('/', subirImagenEncuesta, reglasEncuesta, validarEncuesta, crearEncuesta);

export default router;
