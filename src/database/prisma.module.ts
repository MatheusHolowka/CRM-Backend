import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service'; // Certifique-se de que aponta para este arquivo

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}