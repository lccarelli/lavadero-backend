import { Usuario } from '../models/index.js';

// POST /api/usuarios  body: { nombre }
// Crea (o encuentra) un usuario tipo cliente (es_admin = false) por nombre.
// El cliente no tiene email ni password. Devuelve { id, nombre }.
// Valida en el backend: nombre con al menos 2 caracteres.
export const crearUsuario = async (req, res, next) => {
  try {
    const nombre = (req.body.nombre || '').trim();
    if (nombre.length < 2) {
      return res.status(400).json({ error: 'El nombre debe tener al menos 2 caracteres' });
    }
    const [usuario] = await Usuario.findOrCreate({
      where: { nombre, esAdmin: false },
      defaults: { nombre, esAdmin: false },
    });
    res.status(201).json({ id: usuario.id, nombre: usuario.nombre });
  } catch (err) {
    next(err);
  }
};
