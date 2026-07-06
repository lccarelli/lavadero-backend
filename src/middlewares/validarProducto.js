import { body, validationResult } from 'express-validator';

// Reglas de validación para crear/actualizar un producto (reutilizables en POST y PUT).
export const reglasProducto = [
  body('nombre').trim().notEmpty().withMessage('El nombre es obligatorio'),
  body('precio').isFloat({ gt: 0 }).withMessage('El precio debe ser un número mayor a 0'),
  body('categoria_id').notEmpty().withMessage('La categoría es obligatoria'),
];

// Junta los errores de express-validator; si hay, corta con 400; si no, sigue al controller.
export const validarProducto = (req, res, next) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array().map((e) => e.msg) });
  }
  next();
};
