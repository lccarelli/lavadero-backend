import sequelize, { testConnection } from '../src/config/database.js';
import { syncDatabase, Categoria, Producto, Usuario } from '../src/models/index.js';
import { warmup } from '../src/config/warmup.js';

const productos = [
  { nombre: 'Lavado Express', descripcion: 'Rápido y prolijo: agua a presión y espuma para un brillo al toque.', precio: 8.5, categoria: 'Lavados' },
  { nombre: 'Lavado Completo', descripcion: 'Limpieza por dentro y por fuera para dejarlo como nuevo.', precio: 15.0, categoria: 'Lavados' },
  { nombre: 'Lavado Premium', descripcion: 'Cera, brillo y aroma: el tratamiento más completo.', precio: 22.0, categoria: 'Lavados' },
  { nombre: 'Shampoo', descripcion: 'Espuma suave para una limpieza profunda sin rayar.', precio: 6.0, categoria: 'Accesorios' },
  { nombre: 'Cera', descripcion: 'Protección y brillo que dura semanas.', precio: 9.5, categoria: 'Accesorios' },
  { nombre: 'Microfibra', descripcion: 'Paño premium que no deja marcas ni pelusa.', precio: 4.25, categoria: 'Accesorios' },
];

const seed = async () => {
  console.log('Iniciando seeders...');
  await testConnection();
  await syncDatabase();

  // Categorías base: warmup() (compartido con el arranque del server). Idempotente.
  await warmup();

  // Productos, vinculados a su categoría por nombre. Idempotente.
  const categorias = await Categoria.findAll();
  const idCategoriaPorNombre = Object.fromEntries(
    categorias.map((categoria) => [categoria.nombre, categoria.id])
  );
  for (const producto of productos) {
    await Producto.findOrCreate({
      where: { nombre: producto.nombre },
      defaults: {
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        precio: producto.precio,
        categoria_id: idCategoriaPorNombre[producto.categoria],
      },
    });
  }

  // Admin de prueba (CU-2.2.3). El password se hashea en el hook beforeSave del modelo.
  await Usuario.findOrCreate({
    where: { email: 'admin@lavadero.com' },
    defaults: { nombre: 'admin', email: 'admin@lavadero.com', password: '123Qwerty', esAdmin: true },
  });

  console.log(`Seeders completados (${productos.length} productos, admin: admin@lavadero.com / 123Qwerty)`);
  await sequelize.close();
};

seed().catch((err) => {
  console.error('Error en seeders:', err);
  process.exit(1);
});
