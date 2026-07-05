import { body, validationResult } from 'express-validator';

// Reglas de validación de la encuesta (email, comentario, puntuación 1-10).
export const reglasEncuesta = [
  body('email').trim().isEmail().withMessage('El email no es válido'),
  body('comentario').trim().isLength({ min: 5 }).withMessage('El comentario debe tener al menos 5 caracteres'),
  body('puntuacion').isInt({ min: 1, max: 10 }).withMessage('La puntuación debe estar entre 1 y 10'),
];

// Junta los errores; si hay, corta con 400; si no, sigue al controller.
export const validarEncuesta = (req, res, next) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array().map((e) => e.msg) });
  }
  next();
};
