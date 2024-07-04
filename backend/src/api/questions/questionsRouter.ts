import express, { Response } from 'express';
import asyncHandler from 'express-async-handler';
import { z } from 'zod';
import { validateRequest } from 'zod-express-middleware';

import { logger } from '@/server';

const router = express.Router();

router.get(
  '/',
  validateRequest({
    query: z.object({
      number: z.coerce.number(),
    }),
  }),
  asyncHandler(async ({ query: { number: requestedQuestions } }, res: Response) => {
    logger.info('/questions endpoint called');

    const {
      default: { questions },
    } = await import('@/api/questions/questions.json');
    const availableQuestions = questions.length;

    const requestedNumberOfQuestions = Number(requestedQuestions);
    logger.info({ availableQuestions, requestedQuestions, requestedNumberOfQuestions }); // TODO remove

    if (requestedNumberOfQuestions === 0) {
      throw new Error('Invalid requested question number (0).');
    }

    if (requestedNumberOfQuestions > availableQuestions) {
      throw new Error(`Invalid requested question number (only ${availableQuestions} available).`);
    }

    res.json({
      data: {
        questions: questions.slice(0, requestedNumberOfQuestions),
      },
    });
  })
);

export default router;
