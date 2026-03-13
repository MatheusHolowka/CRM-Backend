import { Injectable, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    try {
      // 1. Verifica se o e-mail já existe (Constraint de unicidade)
      const userExists = await this.prisma.user.findUnique({
        where: { email: dto.email }
      });

      if (userExists) {
        throw new ConflictException('Este e-mail já está cadastrado no sistema.');
      }

      // 2. Hash da senha (Segurança)
      const salt = await bcrypt.genSalt();
      const hashedPass = await bcrypt.hash(dto.senha, salt);

      // 3. Cria o usuário vinculado ao Tenant
      return await this.prisma.user.create({
        data: {
          nome: dto.nome,
          email: dto.email,
          password: hashedPass,
          tenantId: dto.tenantId,
          role: 'USER' // Role padrão
        },
        select: { id: true, nome: true, email: true, role: true } // Não retorna a senha
      });
    } catch (error) {
      if (error instanceof ConflictException) throw error;
      throw new InternalServerErrorException('Erro ao criar usuário no banco.');
    }
  }
}