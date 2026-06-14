import { Categoria } from '../models/index.js';

export const listar = async (req, res, next) => {
  try {
    const categorias = await Categoria.findAll({ order: [['id', 'ASC']] });
    res.json(categorias);
  } catch (err) {
    next(err);
  }
};
