// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import nc from 'next-connect';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { User } from 'interfaces';
import { compare } from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import generateToken from 'tokens/generate';

const handler = nc();
const prisma = new PrismaClient();

export const config = {
  api: {
    externalResolver: true,
  },
};

handler.post('/api/auth/sign-in', async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const request: User = req.body;
    if (!request?.email)
      return res
        .status(401)
        .json({ meta: { status: 'error' }, message: { email: { message: 'Email field is required' } } });
    if (!request?.password)
      return res
        .status(401)
        .json({ meta: { status: 'error' }, message: { password: { message: 'Password field is required' } } });

    const user = await prisma.user.findFirst({ where: { email: request.email } });

    if (!user || !user.password) {
      return res.status(404).json({
        meta: {
          status: 'error',
        },
        message: {
          email: { message: 'User does not exist.' },
        },
      });
    }

    const isValidPassword = await compare(request.password, user.password);

    if (!isValidPassword)
      return res.status(402).json({
        meta: {
          status: 'error',
        },
        message: {
          password: { message: 'Invalid password' },
        },
    });

    return res.status(202).json({
      meta: {
        status: 'success',
      },
      data: generateToken(user.id),
    });
  } catch (error) {
    const errorResponse = JSON.stringify(error);
    return res.status(500).json({ message: errorResponse });
  }
});

export default handler;
