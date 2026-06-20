/**
 * Tests del modelo Usuario
 */
import { describe, it, expect, beforeEach, afterAll } from 'vitest';
import bcrypt from 'bcrypt';
import { Usuario } from '../src/models/index.js';
import { prepararBaseDeDatos, cerrarBaseDeDatos } from './helpers/db.js';

// Password ficticio, solo para los tests. No es una credencial real.
const PASSWORD_DE_PRUEBA = 'password-ficticio-de-test';

beforeEach(prepararBaseDeDatos);
afterAll(cerrarBaseDeDatos);

describe('Modelo Usuario - hash de password', () => {
  it('caso admin: hashea el password antes de guardarlo (no queda en texto plano)', async () => {
    // Act
    const admin = await Usuario.create({
      nombre: 'Admin',
      email: 'admin@lavadero.com',
      password: PASSWORD_DE_PRUEBA,
      esAdmin: true,
    });

    // Assert: lo guardado no es el texto plano, pero bcrypt lo verifica.
    expect(admin.password).not.toBe(PASSWORD_DE_PRUEBA);
    expect(await bcrypt.compare(PASSWORD_DE_PRUEBA, admin.password)).toBe(true);
  });

  it('caso cliente: sin password, el hook no corre y queda sin password', async () => {
    // Act
    const cliente = await Usuario.create({ nombre: 'Cliente sin password' });

    // Assert
    expect(cliente.password).toBeFalsy();
  });
});

describe('Modelo Usuario - email único', () => {
  it('error: no permite dos usuarios con el mismo email (índice único)', async () => {
    // Arrange: un admin con un email.
    await Usuario.create({
      nombre: 'Admin uno',
      email: 'repetido@lavadero.com',
      password: PASSWORD_DE_PRUEBA,
      esAdmin: true,
    });

    // Act + Assert: crear otro con el mismo email debe rechazar.
    await expect(
      Usuario.create({
        nombre: 'Admin dos',
        email: 'repetido@lavadero.com',
        password: PASSWORD_DE_PRUEBA,
        esAdmin: true,
      })
    ).rejects.toThrow();
  });
});
