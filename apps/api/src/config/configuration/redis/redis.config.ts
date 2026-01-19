import { Logger } from '@nestjs/common';
import { registerAs, ConfigType } from '@nestjs/config';
import * as z from 'zod';

import { Configuration } from '@config/configuration';

const logger = new Logger('RedisConfig');

const DEFAULT_REDIS_HOST = 'localhost';
const DEFAULT_REDIS_PORT = 6379;

const redisSchema = z.object({
  REDIS_HOST: z.string().min(1).default(DEFAULT_REDIS_HOST),
  REDIS_PORT: z
    .string()
    .regex(/^\d+$/, 'Must be a number')
    .transform(Number)
    .pipe(z.number().int().min(1).max(65535))
    .default(DEFAULT_REDIS_PORT),
});

export const redisConfig = registerAs(Configuration.REDIS, () => {
  const parsed = redisSchema.parse(process.env);

  logger.log(`${Configuration.REDIS} config loaded.`);

  return {
    host: parsed.REDIS_HOST,
    port: parsed.REDIS_PORT,
  };
});

export type RedisConfig = ConfigType<typeof redisConfig>;
