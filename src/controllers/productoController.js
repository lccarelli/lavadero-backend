import fs from 'node:fs';
import path from 'node:path';
import { Producto, Categoria } from '../models/index.js';

const uploadsDir = process.env.UPLOAD_DIR || 'uploads';
const rutaImagen = (file) => (file ? `/uploads/${file.filename}` : null);
// si los campos opcionales (duracion, stock) vienen vacíos, los guardo como null en la DB
const enteroOpcional = (v) => (v === undefined || v === '' || v === null ? null : Number(v));

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

// POST /api/productos
export const crear = async (req, res, next) => {
  try {
    const { nombre, descripcion, precio, categoria_id, stock, duracion } = req.body;
    if (!nombre || !precio) {
      return res.status(400).json({ error: 'Nombre y precio son obligatorios' });
    }
    const producto = await Producto.create({
      nombre, descripcion, precio, categoria_id,
      stock: enteroOpcional(stock),
      duracion: enteroOpcional(duracion),
      imagen: rutaImagen(req.file),
    });
    res.status(201).json(producto);
  } catch (err) {
    next(err);
  }
};

// PUT /api/productos/:id 
//Si tiene imagen elimina la anterior
export const actualizar = async (req, res, next) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });

    const { nombre, descripcion, precio, categoria_id, stock, duracion } = req.body;
    const datos = {
      nombre, descripcion, precio, categoria_id,
      stock: enteroOpcional(stock),
      duracion: enteroOpcional(duracion),
    };
    if (req.file) {
      //fs unlink elimina la imagen anterior
      if (producto.imagen) fs.unlink(path.join(uploadsDir, path.basename(producto.imagen)), () => {});
      datos.imagen = rutaImagen(req.file);
    }
    await producto.update(datos);
    res.json(producto);
  } catch (err) {
    next(err);
  }
};

// PATCH /api/productos/:id/activar y /:id/desactivar (baja/alta lógica)
export const activar = async (req, res, next) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
    
    await producto.update({ activo: true });
    res.json(producto);
  } catch (err) {
    next(err);
  }
};

export const desactivar = async (req, res, next) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
    
    await producto.update({ activo: false });
    res.json(producto);
  } catch (err) {
    next(err);
  }
};
