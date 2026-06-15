import { Categoria } from '../models/index.js';

// Datos base que el sistema necesita para funcionar. Fuente única: lo usan
// tanto el arranque del server (warmup) como el seeder manual.
export const categoriasBase = [
  { nombre: 'Lavados', descripcion: 'Servicios de lavado de vehículos' },
  { nombre: 'Accesorios', descripcion: 'Productos y accesorios para el vehículo' },
];

// Asegura que las categorías base existan. Idempotente (findOrCreate por nombre).
// Se ejecuta al arrancar para que la API responda sin depender de un seed manual.
export const warmup = async () => {
  for (const cat of categoriasBase) {
    await Categoria.findOrCreate({ where: { nombre: cat.nombre }, defaults: cat });
  }
};
