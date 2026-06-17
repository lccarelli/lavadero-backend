import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

// Venta: una compra del cliente. La fecha es created_at (timestamps).
// precio_total lo calcula el backend (no se confía en el front). usuario_id se define
// por asociación en models/index.js.
const Venta = sequelize.define(
  'Venta',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    precioTotal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    tableName: 'ventas',
  }
);

export default Venta;
