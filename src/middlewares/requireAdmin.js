// Protege rutas del backoffice. Solo los admins tienen sesión (el login valida
// es_admin), así que alcanza con que exista req.session.usuario.
// En vistas redirige al login; en la API responde 401.
export const requireAdmin = (req, res, next) => {
  if (req.session?.usuario) return next();
  if (req.originalUrl.startsWith('/api')) {
    return res.status(401).json({ error: 'No autenticado' });
  }
  return res.redirect('/admin/login');
};
