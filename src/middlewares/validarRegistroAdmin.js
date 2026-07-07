import { body, validationResult } from 'express-validator';

// Reglas de forma para crear un admin (mismo patrón que productos).
export const reglasRegistroAdmin = [
  body('nombre').trim().isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),
  body('email').trim().isEmail().withMessage('El email no es válido'),
  body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
];

// Junta los errores; si hay, corta con 400; si no, sigue al controller.
export const validarRegistroAdmin = (req, res, next) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array().map((e) => e.msg) });
  }
  next();
};
