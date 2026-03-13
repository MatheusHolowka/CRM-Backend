import {
  Injectable,
  Logger,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateLeadDto } from './dto/create-lead.dto';

@Injectable()
export class LeadsService {
  // Criamos um logger com o contexto do serviço
  private readonly logger = new Logger(LeadsService.name);

  constructor(private prisma: PrismaService) {}

  async create(dto: CreateLeadDto, tenantId: string) {
    try {
      this.logger.log(`Tentando criar lead para o Tenant: ${tenantId}`);

      return await this.prisma.lead.create({
        data: {
          ...dto,
          tenantId,
        },
      });
    } catch (error) {
      // Aqui o console do seu VS Code vai mostrar TUDO
      this.logger.error('❌ Erro ao criar Lead no MongoDB:');
      this.logger.error(error.message);

      // Se o erro for do Prisma (ex: campo único duplicado)
      if (error.code === 'P2002') {
        throw new BadRequestException(
          'Este Lead já existe no banco de dados (Campo único duplicado).',
        );
      }

      throw new InternalServerErrorException(
        'Erro interno ao processar o Lead no banco.',
      );
    }
  }

  async findAll(tenantId: string) {
    try {
      return await this.prisma.lead.findMany({
        where: { tenantId },
        orderBy: { dataCriacao: 'desc' },
      });
    } catch (error) {
      this.logger.error(
        `❌ Erno ao buscar Leads do Tenant ${tenantId}:`,
        error.message,
      );
      throw new InternalServerErrorException('Erro ao listar leads.');
    }
  }

  async updateStatus(id: string, tenantId: string, status: string) {
    try {
      return await this.prisma.lead.update({
        where: {
          id,
          tenantId,
        },
        data: { status },
      });
    } catch (error) {
      this.logger.error(`❌ Erro ao atualizar Lead ${id}:`, error.message);
      throw new BadRequestException(
        'Não foi possível atualizar o status do lead.',
      );
    }
  }
  async update(id: string, dto: Partial<CreateLeadDto>, tenantId: string) {
    try {
      this.logger.log(`Atualizando lead ${id} para o Tenant: ${tenantId}`);

      return await this.prisma.lead.update({
        where: {
          id,
          tenantId, // Segurança: só edita se o lead for do tenant logado
        },
        data: dto,
      });
    } catch (error) {
      this.logger.error(`❌ Erro ao atualizar Lead ${id}:`, error.message);
      throw new BadRequestException(
        'Não foi possível atualizar os dados do lead.',
      );
    }
  }
}
