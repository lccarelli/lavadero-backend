import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

// Producto: lavados (servicios) y accesorios (productos físicos).
// La relación con Categoria se define en models/index.js (categoria_id).
const Producto = sequelize.define(
  'Producto',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING,
    },
    precio: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER, // opcional, null para lavados
    },
    duracion: {
      type: DataTypes.INTEGER, // opcional, null para accesorios
    },
    imagen: {
      type: DataTypes.STRING, // path en el server; null hasta que se suba una imagen
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true, // baja lógica: nunca se borra, se desactiva
    },
  },
  {
    tableName: 'productos',
  }
);

export default Producto;
