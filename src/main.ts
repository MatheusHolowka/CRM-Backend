import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
      credentials: true,
    }
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const port = 3000;
  // Usar 0.0.0.0 aqui resolve o conflito de localhost no Windows
  await app.listen(port, '0.0.0.0'); 
  
  console.log(`🚀 API rodando em: http://localhost:${port}`);
}
bootstrap();