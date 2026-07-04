/**
 * Tests de autenticación del admin (TK-F-03.2): registro por API, login por
 * vista EJS y protección de rutas con requireAdmin.
 */
import { describe, it, expect, beforeEach, afterAll } from 'vitest';
import request from 'supertest';
import bcrypt from 'bcrypt';
import app from '../src/app.js';
import { Usuario } from '../src/models/index.js';
import { prepararBaseDeDatos, cerrarBaseDeDatos } from './helpers/db.js';

beforeEach(prepararBaseDeDatos);
afterAll(cerrarBaseDeDatos);

const crearAdmin = () =>
  Usuario.create({ nombre: 'Admin', email: 'admin@lavadero.com', password: '123Qwerty', esAdmin: true });

describe('POST /api/auth/registro-admin', () => {
  it('crea un admin con password hasheado y es_admin true', async () => {
    const res = await request(app)
      .post('/api/auth/registro-admin')
      .send({ nombre: 'Nuevo', email: 'nuevo@lavadero.com', password: 'secreto1' });

    expect(res.status).toBe(201);
    expect(res.body.email).toBe('nuevo@lavadero.com');
    expect(res.body.password).toBeUndefined();

    const usuario = await Usuario.findOne({ where: { email: 'nuevo@lavadero.com' } });
    expect(usuario.esAdmin).toBe(true);
    expect(usuario.password).not.toBe('secreto1');
    expect(await bcrypt.compare('secreto1', usuario.password)).toBe(true);
  });

  it('email duplicado devuelve 409', async () => {
    await crearAdmin();
    const res = await request(app)
      .post('/api/auth/registro-admin')
      .send({ nombre: 'Otro', email: 'admin@lavadero.com', password: 'otra1234' });

    expect(res.status).toBe(409);
  });
});

describe('POST /admin/login', () => {
  it('credenciales correctas inician sesión y redirigen al dashboard', async () => {
    await crearAdmin();
    const res = await request(app)
      .post('/admin/login')
      .type('form')
      .send({ email: 'admin@lavadero.com', password: '123Qwerty' });

    expect(res.status).toBe(302);
    expect(res.headers.location).toBe('/admin/dashboard');
  });

  it('credenciales inválidas devuelven 401 y re-renderizan el login con error', async () => {
    await crearAdmin();
    const res = await request(app)
      .post('/admin/login')
      .type('form')
      .send({ email: 'admin@lavadero.com', password: 'incorrecta' });

    expect(res.status).toBe(401);
    expect(res.text).toContain('Credenciales inválidas');
  });
});

describe('requireAdmin (GET /admin/dashboard)', () => {
  it('sin sesión redirige al login', async () => {
    const res = await request(app).get('/admin/dashboard');
    expect(res.status).toBe(302);
    expect(res.headers.location).toBe('/admin/login');
  });

  it('con sesión responde 200 y muestra el panel', async () => {
    await crearAdmin();
    const agent = request.agent(app);
    await agent.post('/admin/login').type('form').send({ email: 'admin@lavadero.com', password: '123Qwerty' });

    const res = await agent.get('/admin/dashboard');
    expect(res.status).toBe(200);
    expect(res.text).toContain('Panel de administración');
  });
});
