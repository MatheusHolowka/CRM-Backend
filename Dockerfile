FROM node:20-alpine
WORKDIR /app

# Instala dependências primeiro para aproveitar o cache do Docker
COPY package*.json ./
RUN npm install

# Copia o schema e gera o client
COPY prisma ./prisma/
RUN npx prisma generate

# Copia o restante dos arquivos e realiza o build
COPY . .
RUN npm run build

# Expõe a porta da API
EXPOSE 3000

# Comando ajustado com verificação de diretório
CMD sh -c "sleep 20 && npx prisma db push && npx prisma db seed && (node dist/main || node dist/src/main)"