# Usa una imagen de Node.js 18
FROM node:18

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos del proyecto al contenedor
COPY . .

# Instala las dependencias
RUN npm install

# Desactiva el análisis de Angular
RUN npx ng analytics off

# Compila la aplicación Angular en modo producción
RUN npm run build

# Expone el puerto que utilizará la aplicación
EXPOSE 4200

# Inicia la aplicación en modo de servidor Angular
CMD ["npx", "ng", "serve", "--host", "0.0.0.0", "--port", "4200"]