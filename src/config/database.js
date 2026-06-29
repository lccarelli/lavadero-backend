import {Sequelize} from 'sequelize';
import 'dotenv/config';

// Mismas opciones de mapeo en cualquier entorno: camelCase de JS a snake_case en BD.
const opcionesComunes = {
    define: {
        underscored: true,
        timestamps: true,
    },
};

// En tests usamos SQLite levantado en memoria
const sequelize =
    process.env.NODE_ENV === 'test'
        ? new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            ...opcionesComunes,
        })
        : new Sequelize(
            process.env.DB_NAME || 'lavadero_db',
            process.env.DB_USER || 'root',
            process.env.DB_PASSWORD || 'root',
            {
                host: process.env.DB_HOST || 'localhost',
                port: process.env.DB_PORT || 3306,
                dialect: 'mysql',
                logging: process.env.NODE_ENV === 'development' ? console.log : false,
                ...opcionesComunes,
            }
        );

// Reintenta para tolerar que MySQL todavía no acepte conexiones cuando el backend arranca
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
