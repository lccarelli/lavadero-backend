import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

// Pivote N:M entre Venta y Producto. precio_unitario es el snapshot del precio al
// momento de la venta: no se actualiza aunque después cambie el precio del producto.
const VentaProducto = sequelize.define(
  'VentaProducto',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    precioUnitario: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    tableName: 'venta_productos',
  }
);

export default VentaProducto;
