# Usa una imagen de Node.js 18 para Angular
FROM node:18
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod
CMD ["npm", "start"]
