FROM node:20-alpine

# Adicione estas linhas para aceitar os argumentos do Easypanel
ARG DATABASE_URL
ARG MONGO_ROOT_USER
ARG MONGO_ROOT_PASSWORD
ARG MONGO_DB_NAME

# Transforma os argumentos em variáveis de ambiente para o build
ENV DATABASE_URL=$DATABASE_URL

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY prisma ./prisma/
# O Prisma agora terá a DATABASE_URL para gerar o client
RUN npx prisma generate

COPY . .
RUN npm run build

EXPOSE 3000

# Comando para rodar as operações de banco e subir a API
CMD sh -c "npx prisma db push && npx prisma db seed && node dist/main"