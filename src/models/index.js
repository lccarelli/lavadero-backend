import sequelize from '../config/database.js';

// TODO: importar modelos cuando se vayan creando
import Categoria from './Categoria.js';
import Producto from './Producto.js';
import Usuario from './Usuario.js';
// import Venta from './Venta.js';
// import VentaProducto from './VentaProducto.js';

// Asociaciones
Categoria.hasMany(Producto, { foreignKey: 'categoria_id', as: 'productos' });
Producto.belongsTo(Categoria, { foreignKey: 'categoria_id', as: 'categoria' });
// Venta.belongsToMany(Producto, { through: VentaProducto });
// Producto.belongsToMany(Venta, { through: VentaProducto });

export const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: false });
    console.log('Modelos sincronizados con la base de datos');
  } catch (error) {
    console.error('Error sincronizando modelos:', error.message);
    throw error;
  }
};

export { sequelize, Categoria, Producto, Usuario };
