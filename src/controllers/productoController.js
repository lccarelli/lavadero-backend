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
