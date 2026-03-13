// src/leads/dto/create-lead.dto.ts
import { IsString, IsEmail, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateLeadDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  nome: string;

  @IsString()
  @IsNotEmpty({ message: 'O telefone é obrigatório' })
  telefone: string;

  @IsString()
  @IsNotEmpty({ message: 'A cidade é obrigatória' })
  cidade: string;

  // ADICIONE O @IsOptional() AQUI
  @IsEmail({}, { message: 'O formato do e-mail é inválido' })
  @IsOptional() 
  email?: string;

  @IsString()
  @IsOptional()
  origem?: string;
}