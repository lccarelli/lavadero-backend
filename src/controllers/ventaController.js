import { crearVenta } from '../services/ventaService.js';
import { Venta, VentaProducto, Producto, Usuario } from '../models/index.js';

// Trae la venta con su usuario y sus items (cada uno con el producto), para el ticket.
function obtenerVentaCompleta(id) {
  return Venta.findByPk(id, {
    include: [
      { model: Usuario, as: 'usuario', attributes: ['id', 'nombre'] },
      {
        model: VentaProducto,
        as: 'items',
        include: [{ model: Producto, as: 'producto', attributes: ['id', 'nombre'] }],
      },
    ],
  });
}

// POST /api/ventas  body: { usuario_id, items: [{ producto_id, cantidad }] }
// El total lo calcula el backend; el front nunca lo manda.
export const registrarVenta = async (req, res, next) => {
  try {
    const { usuario_id, items } = req.body;
    if (!usuario_id) {
      return res.status(400).json({ error: 'Falta el usuario' });
    }
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'El carrito está vacío' });
    }
    const ventaId = await crearVenta({ usuarioId: usuario_id, items });
    res.status(201).json(await obtenerVentaCompleta(ventaId));
  } catch (err) {
    next(err);
  }
};

// GET /api/ventas/:id  (para mostrar/recargar el ticket)
export const obtenerVenta = async (req, res, next) => {
  try {
    const venta = await obtenerVentaCompleta(req.params.id);
    if (!venta) {
      return res.status(404).json({ error: 'Venta no encontrada' });
    }
    res.json(venta);
  } catch (err) {
    next(err);
  }
};
