import express, { Response } from 'express';
import asyncHandler from 'express-async-handler';

import { logger } from '@/server';

const router = express.Router();

router.get(
  '/',
  asyncHandler(async (_, res: Response) => {
    logger.info('/questions endpoint called');

    const { default: questions } = await import('@/api/questions/questions.json');

    res.json({ data: questions });
  })
);

export default router;
