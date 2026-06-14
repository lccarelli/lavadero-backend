import { Sequelize } from 'sequelize';
import 'dotenv/config';

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    define: {
      underscored: true, // mapea camelCase de JS a snake_case en BD
      timestamps: true,
    },
  }
);

// Reintenta para tolerar que MySQL todavía no acepte conexiones cuando el
// backend arranca (típico con base nueva en Docker: el healthcheck da "healthy"
// antes de que el puerto TCP esté listo).
export const testConnection = async (reintentos = 10, esperaMs = 3000) => {
  for (let intento = 1; intento <= reintentos; intento++) {
    try {
      await sequelize.authenticate();
      console.log('Conexión a MySQL establecida correctamente');
      return;
    } catch (error) {
      console.log(`MySQL no disponible (intento ${intento}/${reintentos}): ${error.message}`);
      if (intento === reintentos) {
        console.error('No se pudo conectar a la base de datos tras varios intentos');
        process.exit(1);
      }
      await new Promise((resolve) => setTimeout(resolve, esperaMs));
    }
  }
};

export default sequelize;
