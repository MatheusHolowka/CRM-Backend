import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './database/prisma.module';
import { AuthModule } from './auth/auth.module'; // 1. Importe o módulo

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Torna o .env acessível em todo o projeto
    }),
    PrismaModule,
    AuthModule, // 2. Registre o módulo aqui
  ],
})
export class AppModule {}