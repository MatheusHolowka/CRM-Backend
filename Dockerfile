FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install

# Copia o schema e gera o client (não precisa de DB ativa aqui)
COPY prisma ./prisma/
RUN npx prisma generate

COPY . .
RUN npm run build

EXPOSE 3000

# No seu comando de inicialização (Dockerfile ou Compose)
CMD sh -c "sleep 10 && npx prisma db push && npx prisma db seed && node dist/main"