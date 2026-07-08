import { body, validationResult } from 'express-validator';

// Reglas de forma de la venta. La lógica de negocio (producto existe / está activo)
// la valida ventaService dentro de la transacción; acá solo el shape del request.
export const reglasVenta = [
  body('usuario_id').notEmpty().withMessage('Falta el usuario'),
  body('items').isArray({ min: 1 }).withMessage('El carrito está vacío'),
  body('items.*.producto_id').notEmpty().withMessage('Cada ítem necesita un producto'),
  body('items.*.cantidad').isInt({ min: 1 }).withMessage('La cantidad debe ser al menos 1'),
];

// Junta los errores; si hay, corta con 400; si no, sigue al controller.
export const validarVenta = (req, res, next) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array().map((e) => e.msg) });
  }
  next();
};
