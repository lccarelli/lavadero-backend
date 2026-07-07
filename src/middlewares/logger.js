// Middleware de aplicación: loguea cada request que ENTRA y cada respuesta que SALE
// (método, URL, status y duración). Se registra antes de las rutas para ver todo el tráfico.
export function logger(req, res, next) {
  // En los tests no logueamos, para no ensuciar la salida.
  if (process.env.NODE_ENV === 'test') return next();

  const inicio = Date.now();
  console.log(`--> ${req.method} ${req.originalUrl}`);

  // 'finish' se dispara cuando la respuesta terminó de enviarse.
  res.on('finish', () => {
    const ms = Date.now() - inicio;
    console.log(`<-- ${req.method} ${req.originalUrl} ${res.statusCode} (${ms}ms)`);
  });

  next();
}
