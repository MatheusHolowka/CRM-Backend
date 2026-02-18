import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  // 1. Habilita o CORS para permitir que o seu Angular (porta 4200) acesse a API
  app.enableCors({
    origin: true, // Em desenvolvimento, permite qualquer origem. Na VPS, você colocará o IP/Dominio
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // 2. Define a porta vinda do .env ou assume a 3000
  const port = process.env.PORT || 3000;
  
  await app.listen(port);
  
  // Log para você ter certeza que a API subiu e em qual porta
  logger.log(`Aplicação Core CRM rodando em: http://localhost:${port}`);
}
bootstrap();