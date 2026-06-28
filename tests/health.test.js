/**
 * Test del endpoint GET /health.
 *
 * Flujo bajo prueba: chequeo de salud que confirma que la app de Express está arriba y respondiendo JSON.
 * No recibe parámetros ni toca la base, así que no tiene casos de error por entrada; solo se verifica el caso normal.
 */
import {describe, it, expect} from 'vitest';
import request from 'supertest';
import app from '../src/app.js';

describe('GET /health', () => {
    it('caso normal: responde 200 con { status: ok } y un timestamp', async () => {
        // Act
        const res = await request(app).get('/health');

        // Assert
        expect(res.status).toBe(200);
        expect(res.body.status).toBe('ok');
        expect(res.body.timestamp).toBeDefined();
    });
});
