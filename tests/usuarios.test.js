/**
 * Tests del endpoint POST /api/usuarios (alta del cliente del autoservicio).
 */
import { describe, it, expect, beforeEach, afterAll } from 'vitest';
import request from 'supertest';
import app from '../src/app.js';
import { prepararBaseDeDatos, cerrarBaseDeDatos } from './helpers/db.js';

beforeEach(prepararBaseDeDatos);
afterAll(cerrarBaseDeDatos);

describe('POST /api/usuarios', () => {
  it('caso normal: crea un cliente y devuelve solo { id, nombre }', async () => {
    // Act
    const res = await request(app).post('/api/usuarios').send({ nombre: 'Laura' });

    // Assert: creado (201) y sin exponer campos sensibles.
    expect(res.status).toBe(201);
    expect(res.body.nombre).toBe('Laura');
    expect(res.body.id).toBeDefined();
    expect(res.body.password).toBeUndefined();
  });

  it('idempotencia: el mismo nombre reutiliza el usuario en vez de crear otro', async () => {
    // Act: dos altas con el mismo nombre.
    const primera = await request(app).post('/api/usuarios').send({ nombre: 'Repetido' });
    const segunda = await request(app).post('/api/usuarios').send({ nombre: 'Repetido' });

    // Assert: mismo id (findOrCreate encontró al existente).
    expect(segunda.body.id).toBe(primera.body.id);
  });

  it('error: nombre de menos de 2 caracteres devuelve 400', async () => {
    // Act
    const res = await request(app).post('/api/usuarios').send({ nombre: 'A' });

    // Assert
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('El nombre debe tener al menos 2 caracteres');
  });

  it('error: body sin nombre devuelve 400', async () => {
    // Act: no mandamos el campo nombre.
    const res = await request(app).post('/api/usuarios').send({});

    // Assert
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('El nombre debe tener al menos 2 caracteres');
  });

  it('error: nombre con solo espacios devuelve 400 (se valida después del trim)', async () => {
    // Act
    const res = await request(app).post('/api/usuarios').send({ nombre: '   ' });

    // Assert
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('El nombre debe tener al menos 2 caracteres');
  });
});
