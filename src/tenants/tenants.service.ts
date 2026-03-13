import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateTenantDto } from './dto/create-tenant.dto';

@Injectable()
export class TenantsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateTenantDto) {
    try {
      return await this.prisma.tenant.create({
        data: {
          nome: dto.nome,
          // Se não enviar slug, podemos gerar um básico ou deixar nulo
          slug: dto.slug || dto.nome.toLowerCase().replace(/ /g, '-'),
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Erro ao criar Tenant no banco.');
    }
  }

  async findAll() {
    return this.prisma.tenant.findMany();
  }
}