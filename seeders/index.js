import sequelize, { testConnection } from '../src/config/database.js';

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
  
  // TODO: implementar en el CU correspondiente
  
  console.log('Seeders completados');
  await sequelize.close();
};

seed().catch((err) => {
  console.error('Error en seeders:', err);
  process.exit(1);
});
