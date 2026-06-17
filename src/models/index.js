import sequelize from '../config/database.js';

// TODO: importar modelos cuando se vayan creando
import Categoria from './Categoria.js';
import Producto from './Producto.js';
import Usuario from './Usuario.js';
import Venta from './Venta.js';
import VentaProducto from './VentaProducto.js';

// Asociaciones
Categoria.hasMany(Producto, { foreignKey: 'categoria_id', as: 'productos' });
Producto.belongsTo(Categoria, { foreignKey: 'categoria_id', as: 'categoria' });

// Una Venta pertenece a un Usuario
Usuario.hasMany(Venta, { foreignKey: 'usuario_id' });
Venta.belongsTo(Usuario, { foreignKey: 'usuario_id', as: 'usuario' });

// Una Venta tiene muchos items (VentaProducto); cada item apunta a un Producto
Venta.hasMany(VentaProducto, { foreignKey: 'venta_id', as: 'items' });
VentaProducto.belongsTo(Venta, { foreignKey: 'venta_id' });
VentaProducto.belongsTo(Producto, { foreignKey: 'producto_id', as: 'producto' });
Producto.hasMany(VentaProducto, { foreignKey: 'producto_id' });

export const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: false });
    console.log('Modelos sincronizados con la base de datos');
  } catch (error) {
    console.error('Error sincronizando modelos:', error.message);
    throw error;
  }
};

export { sequelize, Categoria, Producto, Usuario, Venta, VentaProducto };
