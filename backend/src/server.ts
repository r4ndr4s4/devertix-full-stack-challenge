import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { pino } from 'pino';

import healthCheckRouter from '@/api/healthCheck/healthCheckRouter';
import questionsRouter from '@/api/questions/questionsRouter';
import env from '@/utils/env';
import error from '@/utils/errorMiddleware';

const logger = pino({
  name: 'server start',
});
const app = express();

app.use(
  cors({
    origin: env.FRONTEND_BASE_URL,
    credentials: true,
  })
);
app.use(helmet());

app.use('/health-check', healthCheckRouter);
app.use('/questions', questionsRouter);

app.use(error);

// only for development
app.listen(env.PORT, () => {
  logger.info(`Server listening on port ${env.PORT}`);
});

export { app, logger };
