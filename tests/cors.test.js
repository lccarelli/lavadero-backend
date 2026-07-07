/**
 * CORS: en dev se aceptan localhost y 127.0.0.1 (cualquier puerto); un origen
 * externo no recibe el header Access-Control-Allow-Origin (queda bloqueado).
 */
import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/app.js';

describe('CORS', () => {
  it('permite localhost (refleja el origen)', async () => {
    const res = await request(app).get('/health').set('Origin', 'http://localhost:8080');
    expect(res.headers['access-control-allow-origin']).toBe('http://localhost:8080');
  });

  it('permite 127.0.0.1 (mismo host, distinto nombre y puerto)', async () => {
    const res = await request(app).get('/health').set('Origin', 'http://127.0.0.1:8080');
    expect(res.headers['access-control-allow-origin']).toBe('http://127.0.0.1:8080');
  });

  it('bloquea un origen externo (no manda el header)', async () => {
    const res = await request(app).get('/health').set('Origin', 'http://evil.com');
    expect(res.headers['access-control-allow-origin']).toBeUndefined();
  });
});
