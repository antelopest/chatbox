import { registerAs } from '@nestjs/config';

export const envConfig = registerAs('env', () => ({
  env: process.env.NODE_ENV,
  port: Number(process.env.PORT),
}));
