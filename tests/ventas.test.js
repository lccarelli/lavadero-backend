/**
 * Tests del recurso Venta: POST /api/ventas (registrar la compra) y
 * GET /api/ventas/:id (recuperarla para el ticket).
 *  - el total lo calcula el BACKEND con los precios reales (el front manda solo [{ producto_id, cantidad }], nunca el total),
 *  - se guarda el SNAPSHOT del precio (no cambia si el producto sube después),
 *  - la creación es TRANSACCIONAL (si un ítem falla, no queda nada a medias),
 *  - validaciones de entrada: sin usuario, carrito vacío o mal formado, producto inactivo, producto inexistente, cantidad inválida.
 */
import { describe, it, expect, beforeEach, afterAll } from 'vitest';
import request from 'supertest';
import app from '../src/app.js';
import { Venta } from '../src/models/index.js';
import { prepararBaseDeDatos, cerrarBaseDeDatos } from './helpers/db.js';

let datos;
beforeEach(async () => {
  datos = await prepararBaseDeDatos();
});
afterAll(cerrarBaseDeDatos);

// Builder: body de una venta válida con los productos.
function ventaValida() {
  return {
    usuario_id: datos.cliente.id,
    items: [
      { producto_id: datos.productos.lavadoExpress.id, cantidad: 2 },
      { producto_id: datos.productos.cera.id, cantidad: 1 },
    ],
  };
}

describe('POST /api/ventas (registrar venta)', () => {
  it('caso normal: crea la venta y calcula el total en el backend', async () => {
    // Act
    const res = await request(app).post('/api/ventas').send(ventaValida());

    // Assert: 201, total calculado por el servidor y venta asociada al cliente.
    expect(res.status).toBe(201);
    expect(Number(res.body.precioTotal)).toBe(39); // 8.50*2 + 22.00*1
    expect(res.body.items).toHaveLength(2);
    expect(res.body.usuario).toMatchObject({ id: datos.cliente.id });
  });

  it('regla de negocio: guarda el snapshot de precio (no cambia si el producto sube después)', async () => {
    // Arrange: registramos la venta...
    const creada = await request(app).post('/api/ventas').send(ventaValida());
    // ...y DESPUÉS subimos el precio del producto.
    await datos.productos.lavadoExpress.update({ precio: 99 });

    // Act: recuperamos la venta ya guardada.
    const res = await request(app).get(`/api/ventas/${creada.body.id}`);
    const lineaExpress = res.body.items.find(
      (item) => item.producto.id === datos.productos.lavadoExpress.id
    );

    // Assert: la línea conserva el precio viejo y el total tampoco se recalcula.
    expect(Number(lineaExpress.precioUnitario)).toBe(8.5); // no 99
    expect(Number(res.body.precioTotal)).toBe(39);
  });

  it('regla de negocio: es transaccional, si un ítem falla no persiste ninguna venta (rollback)', async () => {
    // Act: un ítem válido + uno inactivo => el service debe abortar todo.
    const res = await request(app)
      .post('/api/ventas')
      .send({
        usuario_id: datos.cliente.id,
        items: [
          { producto_id: datos.productos.lavadoExpress.id, cantidad: 1 }, // válido
          { producto_id: datos.productos.productoInactivo.id, cantidad: 1 }, // inválido
        ],
      });

    // Assert: error y CERO ventas en la base (la transacción hizo rollback).
    expect(res.status).toBe(400);
    expect(await Venta.count()).toBe(0);
  });

  it('error: falta el usuario devuelve 400', async () => {
    // Act: body sin usuario_id.
    const res = await request(app)
      .post('/api/ventas')
      .send({ items: ventaValida().items });

    // Assert
    expect(res.status).toBe(400);
    expect(res.body.errores).toContain('Falta el usuario');
  });

  it('error: carrito vacío devuelve 400', async () => {
    // Act: items como array vacío.
    const res = await request(app)
      .post('/api/ventas')
      .send({ usuario_id: datos.cliente.id, items: [] });

    // Assert
    expect(res.status).toBe(400);
    expect(res.body.errores).toContain('El carrito está vacío');
  });

  it('error: items con un tipo inválido (no es array) devuelve 400', async () => {
    // Act: items mal formado.
    const res = await request(app)
      .post('/api/ventas')
      .send({ usuario_id: datos.cliente.id, items: 'no soy un array' });

    // Assert
    expect(res.status).toBe(400);
    expect(res.body.errores).toContain('El carrito está vacío');
  });

  it('error: producto inactivo devuelve 400 (baja lógica impide venderlo)', async () => {
    // Act
    const res = await request(app)
      .post('/api/ventas')
      .send({
        usuario_id: datos.cliente.id,
        items: [{ producto_id: datos.productos.productoInactivo.id, cantidad: 1 }],
      });

    // Assert
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/no disponible/i);
  });

  it('error: producto inexistente devuelve 400', async () => {
    // Act
    const res = await request(app)
      .post('/api/ventas')
      .send({
        usuario_id: datos.cliente.id,
        items: [{ producto_id: 9999, cantidad: 1 }],
      });

    // Assert
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/no disponible/i);
  });

  it('error: cantidad no entera/menor a 1 devuelve 400', async () => {
    // Act: cantidad 0.
    const res = await request(app)
      .post('/api/ventas')
      .send({
        usuario_id: datos.cliente.id,
        items: [{ producto_id: datos.productos.lavadoExpress.id, cantidad: 0 }],
      });

    // Assert
    expect(res.status).toBe(400);
    expect(res.body.errores).toContain('La cantidad debe ser al menos 1');
  });
});

describe('GET /api/ventas/:id (recuperar venta)', () => {
  it('caso normal: devuelve la venta con su usuario y sus items', async () => {
    // Arrange
    const creada = await request(app).post('/api/ventas').send(ventaValida());

    // Act
    const res = await request(app).get(`/api/ventas/${creada.body.id}`);

    // Assert
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(creada.body.id);
    expect(res.body.items).toHaveLength(2);
  });

  it('error: venta inexistente devuelve 404', async () => {
    // Act
    const res = await request(app).get('/api/ventas/9999');

    // Assert
    expect(res.status).toBe(404);
    expect(res.body.error).toBe('Venta no encontrada');
  });

  it('error: id no numérico no rompe, devuelve 404 (no encuentra la venta)', async () => {
    // Act
    const res = await request(app).get('/api/ventas/abc');

    // Assert
    expect(res.status).toBe(404);
    expect(res.body.error).toBe('Venta no encontrada');
  });
});
