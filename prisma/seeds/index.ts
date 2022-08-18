import { PrismaClient, Prisma } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

interface Data {
  id: string;
  password?: string;
}
type LowercaseFirst<S extends string> = S extends `${infer P1}${infer P2}`
  ? `${Lowercase<P1>}${P2}`
  : Lowercase<S>;

type Model = LowercaseFirst<keyof typeof Prisma.ModelName>;

async function main() {
  console.log('Running seeders...');
  await exec('user', require('./user.json'));
}

function exec(model: Model, data: Data[]) {
  console.log('\x1b[36m%s\x1b[0m', `${model}:`, `${data.length} row(s)`);

  const upsertPromise = data.map(async (doc: any) => {
    if (doc?.password) {
      doc.password = await hash(doc.password, 12)
    }
    if ('upsert' in prisma[model]) {
      return prisma[model].upsert({
        create: doc,
        update: doc,
        where: { id: doc.id },
      });
    }
  });

  return Promise.all(upsertPromise);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
