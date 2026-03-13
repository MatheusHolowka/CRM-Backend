import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTenantDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome da unidade/empresa é obrigatório' })
  nome: string;

  @IsString()
  @IsOptional()
  slug?: string; // Ex: 'unidade-sinop'
}