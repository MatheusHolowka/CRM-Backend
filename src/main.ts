import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

app.enableCors({
  origin: '*', // Permite qualquer origem
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type,Accept,Authorization',
  // credentials: true, // REMOVA ou comente esta linha, pois '*' não aceita true
});

  const port = process.env.PORT || 3000;
  
  await app.listen(port, '0.0.0.0');
  
  logger.log(`Aplicação Core CRM rodando na porta: ${port}`);
}
bootstrap();