import type { NextApiRequest } from 'next';
import jwtDecode from 'jwt-decode';
import type { GeneratedToken } from 'interfaces';
import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

const CLIENT_URL = process.env.APP_URL;

type Props = (req: NextApiRequest) => Promise<User | undefined>;
export const authorized: Props = async (req) => {
  if (!req.headers?.authorization) return;
  if (!req.headers.authorization.includes('Bearer')) return;
  const getToken = req.headers.authorization?.replace('Bearer ', '');
  
  const token = jwtDecode<GeneratedToken>(getToken);

  if (Date.now() >= token.exp * 1000) return;
  if (CLIENT_URL !== token.source) return;

  const findUser = await prisma.user.findFirst({ where: { id: token.userId }});

  if (!findUser?.id) return;

  return findUser;
};

