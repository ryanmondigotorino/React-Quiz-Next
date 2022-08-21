import { PrismaClient } from '@prisma/client';
import data from './data.json';

const MODEL = 'user';
const documents = data;

const main = async (prisma: PrismaClient) => {
  console.log(`${MODEL}: ${documents.length} row(s)`);
  return Promise.all(
    documents.map(({ ...doc }) => {
      return prisma[MODEL].upsert({
        create: {
          ...doc,
        },
        update: {
          ...doc,
        },
        where: { id: doc.id },
      });
    }),
  );
};

export default main;
