/**
 * Tests del recurso Producto: GET /api/productos (listado paginado con filtros)
 * y GET /api/productos/:id (detalle).
 *
 * Flujos bajo prueba:
 *  - Productos: listado paginado, filtrado por categoría y por activo (baja lógica), con la categoría anidada en cada producto.
 *  - Detalle de un producto por id, con sus errores (no existe, id inválido).
 */
import {describe, it, expect, beforeEach, afterAll} from 'vitest';
import request from 'supertest';
import app from '../src/app.js';
import {prepararBaseDeDatos, cerrarBaseDeDatos} from './helpers/db.js';

let datos;
beforeEach(async () => {
    datos = await prepararBaseDeDatos();
});
afterAll(cerrarBaseDeDatos);

describe('GET /api/productos (listado)', () => {
    it('caso normal: devuelve la forma { data, pagination } con todos los productos', async () => {
        // Act
        const res = await request(app).get('/api/productos');

        // Assert: estructura de respuesta paginada y total correcto.
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body.data)).toBe(true);
        expect(res.body.data).toHaveLength(3); // 2 activos + 1 inactivo
        expect(res.body.pagination).toMatchObject({page: 1, total: 3, totalPages: 1});
    });

    it('incluye la categoría anidada en cada producto (verifica el JOIN del include)', async () => {
        // Act
        const res = await request(app).get('/api/productos');

        // Assert: cada producto trae su categoría embebida, no solo el id.
        const express = res.body.data.find((producto) => producto.nombre === 'Lavado Express');
        expect(express.categoria).toMatchObject({nombre: 'Lavados'});
    });

    it('filtro activo=true: excluye los productos dados de baja (lo que ve el cliente)', async () => {
        // Act
        const res = await request(app).get('/api/productos?activo=true');

        // Assert: solo los 2 activos.
        expect(res.body.data).toHaveLength(2);
        expect(res.body.data.every((producto) => producto.activo)).toBe(true);
    });

    it('filtro por categoría: devuelve solo los productos de esa categoría', async () => {
        // Act
        const res = await request(app).get(`/api/productos?categoria=${datos.categorias.accesorios.id}`);

        // Assert
        expect(res.body.data).toHaveLength(1);
        expect(res.body.data[0].nombre).toBe('Cera protectora');
    });

    it('paginación: limit recorta la página y totalPages se calcula en el backend', async () => {
        // Act
        const res = await request(app).get('/api/productos?limit=2&page=1');

        // Assert
        expect(res.body.data).toHaveLength(2);
        expect(res.body.pagination).toMatchObject({page: 1, limit: 2, total: 3, totalPages: 2});
    });

    it('caso borde: filtrar por una categoría sin productos devuelve data vacío y total 0', async () => {
        // Act: id de categoría que existe pero no tiene productos asociados.
        const res = await request(app).get('/api/productos?categoria=99999');

        // Assert: respuesta válida y vacía, no un error.
        expect(res.status).toBe(200);
        expect(res.body.data).toEqual([]);
        expect(res.body.pagination.total).toBe(0);
    });

    it('caso borde: pedir una página fuera de rango devuelve data vacío pero conserva el total', async () => {
        // Act: hay 1 página de datos, pedimos la 5.
        const res = await request(app).get('/api/productos?page=5');

        // Assert
        expect(res.body.data).toEqual([]);
        expect(res.body.pagination.total).toBe(3);
    });
});

describe('GET /api/productos/:id (detalle)', () => {
    it('caso normal: devuelve el producto pedido con su categoría', async () => {
        // Act
        const res = await request(app).get(`/api/productos/${datos.productos.lavadoExpress.id}`);

        // Assert
        expect(res.status).toBe(200);
        expect(res.body.nombre).toBe('Lavado Express');
        expect(Number(res.body.precio)).toBe(8.5); // DECIMAL: Number() tolera string (MySQL) o número (SQLite)
        expect(res.body.categoria).toMatchObject({nombre: 'Lavados'});
    });

    it('error: id inexistente devuelve 404 con mensaje claro', async () => {
        // Act
        const res = await request(app).get('/api/productos/9999');

        // Assert
        expect(res.status).toBe(404);
        expect(res.body.error).toBe('Producto no encontrado');
    });

    it('error: id no numérico devuelve 400 (validación antes de tocar la base)', async () => {
        // Act
        const res = await request(app).get('/api/productos/abc');

        // Assert
        expect(res.status).toBe(400);
        expect(res.body.error).toBe('Id de producto inválido');
    });

    it('error: id 0 devuelve 400 (los ids válidos arrancan en 1)', async () => {
        // Act
        const res = await request(app).get('/api/productos/0');

        // Assert
        expect(res.status).toBe(400);
        expect(res.body.error).toBe('Id de producto inválido');
    });

    it('error: id negativo devuelve 400', async () => {
        // Act
        const res = await request(app).get('/api/productos/-5');

        // Assert
        expect(res.status).toBe(400);
        expect(res.body.error).toBe('Id de producto inválido');
    });
});
