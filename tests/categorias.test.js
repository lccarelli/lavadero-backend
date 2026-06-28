/**
 * Tests del endpoint GET /api/categorias.
 */
import { describe, it, expect, beforeEach, afterAll } from 'vitest';
import request from 'supertest';
import app from '../src/app.js';
import { Producto, Categoria } from '../src/models/index.js';
import { prepararBaseDeDatos, cerrarBaseDeDatos } from './helpers/db.js';

beforeEach(prepararBaseDeDatos);
afterAll(cerrarBaseDeDatos);

describe('GET /api/categorias', () => {
  it('caso ok: devuelve las categorias guardadas', async () => {
      // request a buscar categorias
      const res = await request(app).get('/api/categorias');
      // Assert: devuelve un array de categorias
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body).toHaveLength(2);
      // verificamos que el array de categorias contiene las categorias que hay en la base de datos
      expect(res.body.map((categoria) => categoria.nombre)).toEqual(['Lavados', 'Accesorios']);
  });

  it('caso con la base sin categorías devuelve un array vacío, no un error', async () => {
      // Arrange: vaciamos productos y categorías (productos primero por la FK)
      await Producto.destroy({ where: {} });
      await Categoria.destroy({ where: {} });
      // request a buscar categorias
      const res = await request(app).get('/api/categorias');
      // Assert: sigue siendo 200 con lista vacía (la pantalla maneja "sin datos").
      expect(res.status).toBe(200);
      expect(res.body).toEqual([]);
  });
});
