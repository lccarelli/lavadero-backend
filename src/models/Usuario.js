import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';
import sequelize from '../config/database.js';

// Usuario del sistema, con dos tipos según es_admin:
// - cliente (es_admin: false): solo nombre. Se crea en la bienvenida; email/password quedan null.
// - admin   (es_admin: true): con email + password. Se usa para el backoffice (login admin, TK-F-03).
const Usuario = sequelize.define(
  'Usuario',
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
    email: {
      type: DataTypes.STRING,
      unique: true, // null para clientes; MySQL permite varios null en un índice único
    },
    password: {
      type: DataTypes.STRING, // null para clientes; hash para admins
    },
    esAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: 'usuarios',
    hooks: {
      // Hashea el password antes de guardar, solo si hay password (los clientes no tienen).
      beforeSave: async (usuario) => {
        if (usuario.changed('password') && usuario.password) {
          usuario.password = await bcrypt.hash(usuario.password, 10);
        }
      },
    },
  }
);

export default Usuario;
