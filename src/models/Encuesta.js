import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

// Encuesta de satisfacción que deja el cliente después de la compra (CU-2.1.6).
// Se vincula opcionalmente a una Venta (venta_id, definido en models/index.js).
const Encuesta = sequelize.define(
  'Encuesta',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    comentario: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    puntuacion: {
      type: DataTypes.INTEGER, // slider 1..10
      allowNull: false,
    },
    recomendaria: {
      type: DataTypes.BOOLEAN, // checkbox
      allowNull: false,
      defaultValue: false,
    },
    imagen: {
      type: DataTypes.STRING, // path en el server; null si no adjuntó imagen
    },
  },
  {
    tableName: 'encuestas',
  }
);

export default Encuesta;
