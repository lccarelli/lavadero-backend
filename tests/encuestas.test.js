/**
 * Tests de la API de encuestas (TK-F-09): creación con validación por campo
 * (email, comentario mínimo, puntuación 1-10) y persistencia con fecha.
 */
import { describe, it, expect, beforeEach, afterAll } from 'vitest';
import request from 'supertest';
import app from '../src/app.js';
import { Encuesta } from '../src/models/index.js';
import { prepararBaseDeDatos, cerrarBaseDeDatos } from './helpers/db.js';

beforeEach(prepararBaseDeDatos);
afterAll(cerrarBaseDeDatos);

const encuestaValida = {
  email: 'cliente@mail.com',
  comentario: 'Muy buena atención y quedó impecable',
  puntuacion: 9,
  recomendaria: 'true',
};

describe('POST /api/encuestas', () => {
  it('caso normal: crea la encuesta y persiste con fecha (201)', async () => {
    const res = await request(app).post('/api/encuestas').send(encuestaValida);

    expect(res.status).toBe(201);
    expect(res.body.email).toBe('cliente@mail.com');
    expect(res.body.recomendaria).toBe(true);

    const enBd = await Encuesta.findByPk(res.body.id);
    expect(enBd).not.toBeNull();
    expect(enBd.createdAt).toBeTruthy(); // persiste con fecha
  });

  it('error: email inválido devuelve 400', async () => {
    const res = await request(app).post('/api/encuestas').send({ ...encuestaValida, email: 'no-es-email' });

    expect(res.status).toBe(400);
    expect(res.body.errores).toContain('El email no es válido');
  });

  it('error: comentario muy corto devuelve 400', async () => {
    const res = await request(app).post('/api/encuestas').send({ ...encuestaValida, comentario: 'ok' });

    expect(res.status).toBe(400);
    expect(res.body.errores).toContain('El comentario debe tener al menos 5 caracteres');
  });

  it('error: puntuación fuera de 1-10 devuelve 400', async () => {
    const res = await request(app).post('/api/encuestas').send({ ...encuestaValida, puntuacion: 15 });

    expect(res.status).toBe(400);
    expect(res.body.errores).toContain('La puntuación debe estar entre 1 y 10');
  });
});
