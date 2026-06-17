import { sequelize, Producto, Venta, VentaProducto } from '../models/index.js';

// Crea la venta dentro de una transacción:
// - calcula el total en el backend con los precios reales (no confía en el front),
// - guarda el snapshot de precio por línea (precio_unitario).
// Devuelve el id de la venta creada.
export async function crearVenta({ usuarioId, items }) {
  return sequelize.transaction(async (transaction) => {
    let precioTotal = 0;
    const lineas = [];

    for (const item of items) {
      const producto = await Producto.findByPk(item.producto_id, { transaction });
      if (!producto || !producto.activo) {
        const error = new Error(`Producto ${item.producto_id} no disponible`);
        error.status = 400;
        throw error;
      }
      const cantidad = parseInt(item.cantidad, 10);
      if (!Number.isInteger(cantidad) || cantidad < 1) {
        const error = new Error('Cantidad inválida');
        error.status = 400;
        throw error;
      }
      const precioUnitario = Number(producto.precio);
      precioTotal += precioUnitario * cantidad;
      lineas.push({ producto_id: producto.id, cantidad, precioUnitario });
    }

    const venta = await Venta.create({ usuario_id: usuarioId, precioTotal }, { transaction });

    for (const linea of lineas) {
      await VentaProducto.create({ venta_id: venta.id, ...linea }, { transaction });
    }

    return venta.id;
  });
}
