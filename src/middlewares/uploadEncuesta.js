import multer from 'multer';
import fs from 'node:fs';

// La imagen de la encuesta va a uploads/encuestas/ (separada de la de productos).
const DEST = `${process.env.UPLOAD_DIR || 'uploads'}/encuestas`;
fs.mkdirSync(DEST, { recursive: true });

const FORMAT_OK = ['image/jpeg', 'image/png', 'image/webp'];
const maxMb = Number(process.env.UPLOAD_MAX_SIZE_MB) || 2;

const upload = multer({
  dest: DEST,
  fileFilter: (req, file, cb) => {
    const ok = FORMAT_OK.includes(file.mimetype);
    cb(ok ? null : new Error('mime'), ok);
  },
  limits: { fileSize: maxMb * 1024 * 1024 },
});

// Procesa el campo imagen (opcional) y responde 400 si el archivo no es válido.
export const subirImagenEncuesta = (req, res, next) => {
  upload.single('imagen')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ errores: ['Imagen inválida (JPG, PNG o WEBP, máx 2 MB)'] });
    }
    next();
  });
};
