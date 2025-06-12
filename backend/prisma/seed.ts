import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10); // defina uma senha segura
  
const admin = await prisma.user.upsert({
  where: { email: 'admin@example.com' },
  update: {},
  create: {
    name: 'Admin',                 // <-- aqui
    email: 'admin@example.com',
    password: hashedPassword,
    role: 'ADMIN',
    active: true,
  },
});

  console.log('Usuário admin criado:', admin);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());