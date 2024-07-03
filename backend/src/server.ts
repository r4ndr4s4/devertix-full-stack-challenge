import cors from 'cors';
import express, { Response } from 'express';
import { pino } from 'pino';

import { env } from './utils/env';

const logger = pino({ name: 'server start' });
const app = express();

app.use(cors({ origin: env.FRONTEND_BASE_URL, credentials: true }));

app.get('/', (_, res: Response) => {
  logger.info('/ endpoint called');

  res.json({ message: 'Hello World!' });
});

// only for development
app.listen(env.PORT, () => {
  logger.info(`Server listening on port ${env.PORT}`);
});

export { app, logger };
