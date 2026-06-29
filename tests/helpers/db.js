/**
 * Helper de base de datos para los tests.
 *
 * Patrón: Test Data Builder / Factory.
 * En vez de que cada test arme sus propios datos a mano, dejamos una funcion para crear datos base para las pruebas.
 * Motor: SQLite en memoria (configurado en src/config/database.js cuando NODE_ENV=test). Es una base real pero descartable.
 */
import {sequelize, Categoria, Producto, Usuario} from '../../src/models/index.js';

/**
 * Recrea todas las tablas (borrando lo anterior) y carga el set base de datos.
 * @returns {Promise<object>} Devuelve las entidades creadas.
 */
export async function prepararBaseDeDatos() {
    // force: true => DROP + CREATE de cada tabla. Deja la base en un estado limpio.
    await sequelize.sync({force: true});

    // Creacion de Categorias
    const lavados = await Categoria.create({
        nombre: 'Lavados',
        descripcion: 'Servicios de lavado',
    });
    const accesorios = await Categoria.create({
        nombre: 'Accesorios',
        descripcion: 'Productos para el vehículo',
    });
    // Creacion de Productos
    const lavadoExpress = await Producto.create({
        nombre: 'Lavado Express',
        descripcion: 'Lavado exterior rápido',
        precio: 8.5,
        duracion: 30,
        categoria_id: lavados.id,
    });
    const cera = await Producto.create({
        nombre: 'Cera protectora',
        descripcion: 'Cera para carrocería',
        precio: 22.0,
        stock: 12,
        categoria_id: accesorios.id,
    });
    const productoInactivo = await Producto.create({
        nombre: 'Lavado discontinuado',
        precio: 5.0,
        activo: false,
        categoria_id: lavados.id,
    });

    // Creacion de Usuario (Cliente)
    const cliente = await Usuario.create({nombre: 'Cliente de prueba'});

    return {
        categorias: {lavados, accesorios},
        productos: {lavadoExpress, cera, productoInactivo},
        cliente,
    };
}

/**
 * Cierra la conexión a la base. Se usa en un afterAll para que Vitest no quede esperando a que se libere el recurso al terminar la suite.
 */
export async function cerrarBaseDeDatos() {
    await sequelize.close();
}
