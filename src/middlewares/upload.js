import multer from 'multer';

// Subida de la imagen del producto: guarda en uploads/ (o UPLOAD_DIR en tests),
// acepta solo imágenes y limita el tamaño a UPLOAD_MAX_SIZE_MB.
const FORMAT_OK = ['image/jpeg', 'image/png', 'image/webp'];
const maxMb = Number(process.env.UPLOAD_MAX_SIZE_MB) || 2;

const upload = multer({
  dest: process.env.UPLOAD_DIR || 'uploads',
  fileFilter: (req, file, cb) => {
    const ok = FORMAT_OK.includes(file.mimetype);
    cb(ok ? null : new Error('mime'), ok);
  },
  limits: { fileSize: maxMb * 1024 * 1024 },
});

// Procesa el campo imagen y responde 400 si el archivo no es válido.
export const subirImagenProducto = (req, res, next) => {
  upload.single('imagen')(req, res, (err) => {
    if (err) return res.status(400).json({ error: 'Imagen inválida' });
    next();
  });
};
