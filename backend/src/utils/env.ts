import dotenv from 'dotenv';
import { cleanEnv, port, url } from 'envalid';

// only for development
dotenv.config();

// only for development
export const env = cleanEnv(process.env, {
  PORT: port({ default: 3000 }),
  FRONTEND_BASE_URL: url({ default: 'https://dslkk3miov5rp.cloudfront.net' }),
});
