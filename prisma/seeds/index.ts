import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

import users from './users';

const main = async () => {
  console.log('Running seeders...');

  await users(prisma);

  console.info('Done!');
};

main()
  .catch(console.error)
  .finally(() => {
    prisma.$disconnect();
  });
