import nc from 'next-connect';
import type { NextApiRequest, NextApiResponse } from 'next';
import { TableParams } from 'interfaces';
import { PrismaClient } from '@prisma/client';

const handler = nc();
const prisma = new PrismaClient();

export const config = {
  api: {
    externalResolver: true,
    bodyParser: false,
  },
};

type Column = 'createdAt' | 'email' | 'name';

interface QueryParams extends TableParams {
  id: string;
}

handler.get('/api/user', async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const params: QueryParams = JSON.parse(JSON.stringify(req.query));

    const pageNumber: number = params?.page || typeof params.page === 'number' ? Number(params?.page) : 1;
    const pageSize: number = params?.size || typeof params.size === 'number' ? Number(params.size) : 25;

    const sorting = params?.sort
      ? { columnName: params.sort.split(',')[0], orientation: params.sort.split(',')[1] }
      : { columnName: 'createdAt', orientation: 'desc' };

    const translateSort = sorting.columnName as Column;

    const conditionalStatement = params?.id ? { where: { id: params.id } } : undefined;
    const searchCondition = params?.search
      ? {
          where: {
            OR: [
              { firstName: { contains: params.search, } },
              { lastName: { contains: params.search } },
              { email: { contains: params.search } },
            ],
          },
        }
      : undefined;

    const users = await prisma.user.findMany({
      ...conditionalStatement,
      ...searchCondition,
      skip: pageNumber === 1 ? 0 : pageSize * (pageNumber - 1),
      take: pageSize,
      orderBy: { [translateSort]: sorting.orientation },
    });

    const totalCount = await prisma.user.count({ ...conditionalStatement, ...searchCondition });

    const last = Math.ceil((Number(totalCount) || 1) / pageSize) || 1;

    return res.status(200).json({
      meta: {
        status: 'success',
        count: totalCount,
      },
      links: {
        self: pageNumber,
        first: 1,
        prev: pageNumber > 1 ? pageNumber - 1 : 1,
        next: pageNumber + 1 < last ? pageNumber + 1 : last,
        last,
      },
      data: users,
    });
  } catch (error) {
    return res.status(500).json({ message: JSON.stringify(error) });
  }
});

export default handler;
