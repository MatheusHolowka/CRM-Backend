FROM node:20-alpine

WORKDIR /app

# Instala as dependências primeiro (aproveita o cache do Docker)
COPY package*.json ./
RUN npm install

# Copia a pasta prisma e gera o client do Prisma 7
COPY prisma ./prisma/
RUN npx prisma generate

# Copia o restante do código fonte
COPY . .

# Executa o build do NestJS - se houver erro aqui, o Docker vai avisar no console
RUN npm run build

EXPOSE 3000

# Executa o arquivo gerado
CMD ["node", "dist/main"]