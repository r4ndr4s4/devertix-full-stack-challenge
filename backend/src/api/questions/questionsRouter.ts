import express, { Response } from 'express';

import { logger } from '@/server';

const router = express.Router();

router.get('/', (_, res: Response) => {
  logger.info('/questions endpoint called');

  res.sendStatus(200);
});

export default router;
