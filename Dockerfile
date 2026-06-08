FROM node:18-alpine

WORKDIR /app

# Instalar dependencias primero (mejor cache de capas)
COPY package*.json ./
RUN npm install --omit=dev

# Código de la app
COPY src/ ./src/
COPY seeders/ ./seeders/

EXPOSE 3000

CMD ["node", "src/app.js"]
