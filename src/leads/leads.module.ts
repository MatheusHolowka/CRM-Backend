import { Module } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { LeadsController } from './leads.controller';
import { PrismaModule } from '../database/prisma.module'; 

@Module({
  imports: [PrismaModule], // Importa o Prisma para que o Service consiga injetar o DB
  controllers: [LeadsController],
  providers: [LeadsService],
  exports: [LeadsService], // Exportamos caso outro módulo precise acessar os leads no futuro
})
export class LeadsModule {}