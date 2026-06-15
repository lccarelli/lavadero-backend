import sequelize, { testConnection } from '../src/config/database.js';
import { syncDatabase, Categoria, Producto } from '../src/models/index.js';

const categorias = [
  { nombre: 'Lavados', descripcion: 'Servicios de lavado de vehículos' },
  { nombre: 'Accesorios', descripcion: 'Productos y accesorios para el vehículo' },
];

const productos = [
  { nombre: 'Lavado Express', descripcion: 'Rápido y prolijo: agua a presión y espuma para un brillo al toque.', precio: 8.5, categoria: 'Lavados' },
  { nombre: 'Lavado Completo', descripcion: 'Limpieza por dentro y por fuera para dejarlo como nuevo.', precio: 15.0, categoria: 'Lavados' },
  { nombre: 'Lavado Premium', descripcion: 'Cera, brillo y aroma: el tratamiento más completo.', precio: 22.0, categoria: 'Lavados' },
  { nombre: 'Shampoo', descripcion: 'Espuma suave para una limpieza profunda sin rayar.', precio: 6.0, categoria: 'Accesorios' },
  { nombre: 'Cera', descripcion: 'Protección y brillo que dura semanas.', precio: 9.5, categoria: 'Accesorios' },
  { nombre: 'Microfibra', descripcion: 'Paño premium que no deja marcas ni pelusa.', precio: 4.25, categoria: 'Accesorios' },
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

  // Categorías
  for (const cat of categorias) {
    await Categoria.findOrCreate({ where: { nombre: cat.nombre }, defaults: cat });
  }

  // Productos (vinculados a su categoría por nombre). Idempotente.
  const cats = await Categoria.findAll();
  const idPorNombre = Object.fromEntries(cats.map((c) => [c.nombre, c.id]));
  for (const p of productos) {
    await Producto.findOrCreate({
      where: { nombre: p.nombre },
      defaults: {
        nombre: p.nombre,
        descripcion: p.descripcion,
        precio: p.precio,
        categoria_id: idPorNombre[p.categoria],
      },
    });
  }

  console.log(`Seeders completados (${categorias.length} categorías, ${productos.length} productos)`);
  await sequelize.close();
};

seed().catch((err) => {
  console.error('Error en seeders:', err);
  process.exit(1);
});
