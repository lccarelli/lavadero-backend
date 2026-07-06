import multer from 'multer';
import path from 'node:path';

// Subida de la imagen del producto: guarda en uploads/ (o UPLOAD_DIR en tests),
// acepta solo imágenes y limita el tamaño a UPLOAD_MAX_SIZE_MB.
const FORMAT_OK = ['image/jpeg', 'image/png', 'image/webp'];
const maxMb = Number(process.env.UPLOAD_MAX_SIZE_MB) || 2;

// diskStorage para CONSERVAR la extensión del archivo. Sin extensión, el
// navegador no reconoce el tipo al servir la imagen y no la renderiza.
const storage = multer.diskStorage({
  destination: process.env.UPLOAD_DIR || 'uploads',
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `imagen-${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const ok = FORMAT_OK.includes(file.mimetype);
    cb(ok ? null : new Error('mime'), ok);
  },
  limits: { fileSize: maxMb * 1024 * 1024 },
});

// Procesa el campo imagen y responde 400 (JSON) si el archivo no es válido.
export const subirImagenProducto = (req, res, next) => {
  upload.single('imagen')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ errores: ['Imagen inválida (formatos: JPG, PNG, WEBP; máx 2 MB)'] });
    }
    next();
  });
};
