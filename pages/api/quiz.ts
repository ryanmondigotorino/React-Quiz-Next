import nc from 'next-connect';
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { TableParams } from 'interfaces';
import { authorized } from 'utilities/guard';
import cuid from 'cuid';

const handler = nc();
const prisma = new PrismaClient();

export const config = {
  api: {
    externalResolver: true,
  },
};

interface QueryParams extends TableParams {
  id: string;
  url?: string;
}

type Column = 'title';

handler.get('/api/quiz', async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const auth = await authorized(req);
    if (!auth?.id) return res.status(403).json({ message: 'Unauthorized Access (Invalid token credentials)'});
    const params: QueryParams = JSON.parse(JSON.stringify(req.query));

    const pageNumber: number = params?.page || typeof params.page === 'number' ? Number(params?.page) : 1;
    const pageSize: number = params?.size || typeof params.size === 'number' ? Number(params.size) : 25;

    const sorting = (
      params?.sort
        ? { columnName: params.sort.split(',')[0], orientation: params.sort.split(',')[1] }
        : { columnName: 'createdAt', orientation: 'desc' }
    ) as { columnName: string; orientation: 'asc' | 'desc' };

    const translateSort = sorting.columnName as Column;

    const searchCondition = params?.search ? { title: { contains: params.search, mode: 'insensitive' }} : undefined

    const defaultCondition = !params?.url ? { where: { userId: auth.id, ...searchCondition }} : undefined;
    const conditionalStatement = params?.url ? { where: { url: params.url } } : undefined;
    
    /* @ts-ignore */
    const quizzes = await prisma.quiz.findMany({
      ...defaultCondition,
      ...conditionalStatement,
      skip: pageNumber === 1 ? 0 : pageSize * (pageNumber - 1),
      take: pageSize,
      orderBy: { [translateSort]: sorting.orientation },
      include: { quizQuestions: { include: { quizChoices: true }} },
    });

    const totalCount = await prisma.quiz.count({
      where: {
        userId: auth.id,
      },
    });

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
      data: quizzes,
    });
  } catch (error) {
    return res.status(500).json({ message: JSON.stringify(error) });
  }
});


/**
 * @param quiz
 * 
 * post request for creating a quiz
 */

interface Choices {
  description: string;
  isAnswer: boolean;
}

interface Questions {
  question: string;
  type: boolean;
  choices: Array<Choices>;
}

interface QuizPost {
  title: string;
  questions: Array<Questions>
}

handler.post('/api/quiz', async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const auth = await authorized(req);
    if (!auth?.id) return res.status(403).json({ message: 'Unauthorized Access (Invalid token credentials)'});
    const request: QuizPost = JSON.parse(JSON.stringify(req.body));

    if (!request.title) return res.status(401).json({
      meta: {
        status: 'error',
      },
      message: {
        title: 'Title is required',
      },
    });

    if (request.questions.length < 10) return res.status(401).json({
      meta: {
        status: 'error',
      },
      message: {
        title: 'Add atleast 10 questions above.',
      },
    });

    const urlBase = cuid();
    const urlSlug = urlBase.slice(urlBase.length - 6);

    const quiz = await prisma.quiz.create({
      data: {
        title: request.title,
        userId: auth.id,
        status: 0,
        url: urlSlug,
        quizQuestions: {
          create: request.questions.map((question) => ({
            id: cuid(),
            question: question.question,
            type: question.type,
            quizChoices: {
              create: question.choices.map((choice) => ({
                id: cuid(),
                description: choice.description,
                isAnswer: choice.isAnswer,
              }))
            }
          }))
        }
      }
    });

    return res.status(201).json({
      meta: {
        status: 'success',
      },
      data: quiz,
    });
  } catch (error) {
    return res.status(500).json({ message: JSON.stringify(error) });
  }
});

export default handler;
