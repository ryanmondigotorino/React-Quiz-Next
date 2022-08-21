// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import nc from 'next-connect';
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, User } from '@prisma/client';
import type { Field } from 'interfaces';
import { hash } from 'bcryptjs';

const handler = nc();
const prisma = new PrismaClient();

export const config = {
  api: {
    externalResolver: true,
  },
};

const validations = {
  firstName: {
    pattern: /^(?:[^-\s][a-zA-Zñ\s-]+)?$/,
    message: 'Please enter a valid first name',
  },
  lastName: {
    pattern: /^(?:[^-\s][a-zA-Zñ\s-]+)?$/,
    message: 'Please enter a valid last name',
  },
  email: {
    pattern:
      /^(?:(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})))?$/,
    message: 'Please enter a valid email address',
  },
};

type Error = {
  message: {
    [v: string]: { message: string }
  }
};


handler.post('/api/auth/sign-up', async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const request: User = req.body;
    const responses = { message: {} }
    if (!request?.firstName)
      responses.message = { ...responses.message, firstName: { message: 'First Name field is required' }};
    if (!request?.lastName)
      responses.message = { ...responses.message, lastName: { message: 'Last Name field is required' }};
    if (!request?.email)
      responses.message = { ...responses.message, email: { message: 'Email field is required' }};
    if (!request?.password)
      responses.message = { ...responses.message, password: { message: 'Password field is required' }};
    if (Object.keys(responses.message).length) {
      return res.status(401).json({
        meta: {
          status: 'error',
        },
        ...responses
      })
    }
    let hasError = false;
    Object.keys(request).forEach((val) => {
      const validation: Field['Validations'] = validations;
      const values = val as Field['UserValidation'];
      if (validation[values]?.pattern) {
        if (!validation[values].pattern?.test(request[values])) {
          hasError = true;
          return res.status(405).json({
            meta: {
              status: 'error',
            },
            message: {
              [values]: { message: validation[values].message },
            },
          });
        }
      }
      return false;
    });

    const checkUserIfExists = await prisma.user.findFirst({ where: { email: request.email } });

    if (checkUserIfExists?.id)
      return res.status(405).json({
        meta: {
          status: 'error',
        },
        message: {
          email: { message: 'Email already exists!' },
        },
      });

    if (!hasError) {
      const user = await prisma.user.create({
        data: {
          firstName: request.firstName,
          lastName: request.lastName,
          email: request.email,
          password: request.password ? await hash(request.password, 12) : null,
        },
      });
      const userResponse = JSON.parse(JSON.stringify(user));

      return res.status(200).json({
        meta: {
          status: 'success',
        },
        data: userResponse,
      });
    }
    return false;
  } catch (error) {
    return res.status(500).json({ message: JSON.stringify(error) });
  }
});

export default handler;
