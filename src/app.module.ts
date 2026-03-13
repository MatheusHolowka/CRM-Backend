import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './database/prisma.module';
import { AuthModule } from './auth/auth.module'; // 1. Importe o módulo
import { LeadsModule } from './leads/leads.module'; // Importe o módulo de leads
import { UsersModule } from './users/users.module'; // Importe o módulo de usuários
import { TenantsModule } from './tenants/tenants.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Torna o .env acessível em todo o projeto
    }),
    PrismaModule,
    AuthModule, // 2. Registre o módulo aqui
    LeadsModule, // Registre o módulo de leads
    UsersModule, // Registre o módulo de usuários 
    TenantsModule, // Registre o módulo de tenants
  ],
})
export class AppModule {}