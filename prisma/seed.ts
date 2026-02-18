import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // A senha continua Csf@2753, mas aqui ela é criptografada para o banco
  const passwordHash = await bcrypt.hash('Csf@2753', 10);

  // 1. Busca ou cria o Tenant com o slug CRM-DEV
  let tenant = await prisma.tenant.findUnique({
    where: { slug: 'crm-dev' },
  });

  if (!tenant) {
    tenant = await prisma.tenant.create({
      data: {
        nome: 'Ambiente de Desenvolvimento CRM',
        slug: 'crm-dev',
      },
    });
    console.log('Tenant CRM-DEV criado com sucesso.');
  }

  // 2. Busca ou cria o Usuário Admin vinculado a este Tenant
  const user = await prisma.user.findUnique({
    where: { email: 'matheus@agro.com' },
  });

  if (!user) {
    await prisma.user.create({
      data: {
        nome: 'Matheus Admin',
        email: 'matheus@agro.com',
        password: passwordHash,
        role: 'ADMIN',
        tenantId: tenant.id,
      },
    });
    console.log('Usuário admin (matheus@agro.com) criado.');
  }

  console.log('Seed finalizado com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });