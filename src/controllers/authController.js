import bcrypt from 'bcrypt';
import { Usuario } from '../models/index.js';

// Busca un admin por email y valida el password contra el hash. Devuelve el
// usuario si las credenciales son correctas, o null en cualquier otro caso.
// No distingue "email inexistente" de "password incorrecta" (anti-enumeración).
const validarCredenciales = async (email, password) => {
  const usuario = await Usuario.findOne({ where: { email, esAdmin: true } });
  if (!usuario) return null;
  const ok = await bcrypt.compare(password || '', usuario.password || '');
  return ok ? usuario : null;
};

const datosSesion = (usuario) => ({
  id: usuario.id,
  nombre: usuario.nombre,
  email: usuario.email,
});

// GET /admin/login - vista. Si ya hay sesión, va directo al dashboard.
export const renderLogin = (req, res) => {
  if (req.session?.usuario) return res.redirect('/admin/dashboard');
  res.render('admin/login', { error: null });
};

// POST /admin/login - procesa el form, inicia sesión y redirige al dashboard.
// En error re-renderiza la misma vista con un mensaje genérico (401).
export const login = async (req, res, next) => {
  try {
    const email = (req.body.email || '').trim();
    const usuario = await validarCredenciales(email, req.body.password);
    if (!usuario) {
      return res.status(401).render('admin/login', { error: 'Credenciales inválidas' });
    }
    req.session.usuario = datosSesion(usuario);
    res.redirect('/admin/dashboard');
  } catch (err) {
    next(err);
  }
};

// POST /admin/logout - elimina la sesión y vuelve al login.
export const logout = (req, res) => {
  req.session.destroy(() => res.redirect('/admin/login'));
};

// POST /api/auth/registro-admin - crea un admin (es_admin = true).
export const registroAdmin = async (req, res, next) => {
  try {
    const nombre = (req.body.nombre || '').trim();
    const email = (req.body.email || '').trim();
    const { password } = req.body;
    if (nombre.length < 2 || !email || !password) {
      return res.status(400).json({ error: 'nombre (mín 2), email y password son obligatorios' });
    }
    if (await Usuario.findOne({ where: { email } })) {
      return res.status(409).json({ error: 'El email ya está registrado' });
    }
    const usuario = await Usuario.create({ nombre, email, password, esAdmin: true });
    res.status(201).json(datosSesion(usuario));
  } catch (err) {
    next(err);
  }
};

// POST /api/auth/login - login por API. Inicia la misma sesión que la vista.
// 401 genérico sin filtrar si el email existe.
export const loginApi = async (req, res, next) => {
  try {
    const email = (req.body.email || '').trim();
    const usuario = await validarCredenciales(email, req.body.password);
    if (!usuario) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    req.session.usuario = datosSesion(usuario);
    res.json(datosSesion(usuario));
  } catch (err) {
    next(err);
  }
};
