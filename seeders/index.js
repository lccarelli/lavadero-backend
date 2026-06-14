import sequelize, { testConnection } from '../src/config/database.js';
import { syncDatabase, Categoria } from '../src/models/index.js';

const categorias = [
  { nombre: 'Lavados', descripcion: 'Servicios de lavado de vehículos' },
  { nombre: 'Accesorios', descripcion: 'Productos y accesorios para el vehículo' },
];

// TODO: este archivo va a ejecutarse con `npm run seed`
// Debe:
// 1. Conectar a la BD
// 2. Sincronizar modelos
// 3. Insertar categorías
// 4. Insertar productos
// 5. Insertar admin de prueba
// 6. Cerrar conexión

const seed = async () => {
  console.log('Iniciando seeders...');
  await testConnection();
  await syncDatabase();

  // TODO: implementar en el CU correspondiente
  for (const cat of categorias) {
    await Categoria.findOrCreate({ where: { nombre: cat.nombre }, defaults: cat });
  }

  console.log('Seeders completados');
  await sequelize.close();
};

seed().catch((err) => {
  console.error('Error en seeders:', err);
  process.exit(1);
});
