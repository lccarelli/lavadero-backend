import { Producto, Categoria } from '../models/index.js';

// GET /api/productos?categoria=<id>&activo=true&page=1&limit=8
// Devuelve { data, pagination }. El cliente pide activo=true; el admin, sin filtro.
export const listar = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.max(1, parseInt(req.query.limit, 10) || 8);

    const where = {};
    if (req.query.categoria) where.categoria_id = req.query.categoria;
    if (req.query.activo === 'true') where.activo = true;

    const { count, rows } = await Producto.findAndCountAll({
      where,
      include: [{ model: Categoria, as: 'categoria', attributes: ['id', 'nombre'] }],
      order: [['id', 'ASC']],
      limit,
      offset: (page - 1) * limit,
    });

    res.json({
      data: rows,
      pagination: {
        page,
        limit,
        total: count,
        totalPages: Math.ceil(count / limit),
      },
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/productos/:id
// 400 si el id no es válido, 404 si no existe, 200 con el producto (incluye categoría).
export const obtenerProducto = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id < 1) {
      return res.status(400).json({ error: 'Id de producto inválido' });
    }
    const producto = await Producto.findByPk(id, {
      include: [{ model: Categoria, as: 'categoria', attributes: ['id', 'nombre'] }],
    });
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(producto);
  } catch (err) {
    next(err);
  }
};
