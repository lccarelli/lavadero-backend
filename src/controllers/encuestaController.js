import { Encuesta } from '../models/index.js';

const rutaImagen = (file) => (file ? `/uploads/encuestas/${file.filename}` : null);

// El checkbox llega como 'on'/'true' (o ausente). Lo normalizamos a booleano.
const aBooleano = (v) => v === true || v === 'true' || v === 'on';

// POST /api/encuestas — la deja el cliente después de la compra.
// La fecha la pone Sequelize (created_at). La imagen es opcional (multipart).
export const crearEncuesta = async (req, res, next) => {
  try {
    const { email, comentario, puntuacion, recomendaria, venta_id } = req.body;
    const encuesta = await Encuesta.create({
      email: email.trim(),
      comentario: comentario.trim(),
      puntuacion,
      recomendaria: aBooleano(recomendaria),
      venta_id: venta_id || null,
      imagen: rutaImagen(req.file),
    });
    res.status(201).json(encuesta);
  } catch (err) {
    next(err);
  }
};
