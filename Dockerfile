FROM node:18-alpine

WORKDIR /app

# Instalar dependencias primero (mejor cache de capas)
COPY package*.json ./
# Por defecto solo deps de producción. En dev (docker-compose.dev.yml) se pasa
# INSTALL_DEV=true para incluir vitest/supertest y poder correr tests/--watch.
ARG INSTALL_DEV=false
RUN if [ "$INSTALL_DEV" = "true" ]; then npm install; else npm install --omit=dev; fi

# Código de la app
COPY src/ ./src/
COPY seeders/ ./seeders/

EXPOSE 3000

CMD ["node", "src/app.js"]
