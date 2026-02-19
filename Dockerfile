# Etapa 1: Build
FROM node:20-alpine AS build
WORKDIR /app

# Instala dependências
COPY package*.json ./
RUN npm install

# Copia código e gera o build
COPY . .
RUN npm run build --configuration=production

# Etapa 2: Servidor interno para o Easypanel servir os arquivos
FROM nginx:alpine

# Copia os arquivos da pasta que o seu log confirmou: /app/dist/crmProj/browser
COPY --from=build /app/dist/crmProj/browser /usr/share/nginx/html

# Configuração essencial para as rotas do seu CRM funcionarem no navegador
RUN printf 'server { \n\
    listen 80; \n\
    location / { \n\
        root /usr/share/nginx/html; \n\
        index index.html index.htm; \n\
        try_files $uri $uri/ /index.html; \n\
    } \n\
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]