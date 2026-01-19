import { Logger } from '@nestjs/common';
import { registerAs, ConfigType } from '@nestjs/config';
import * as z from 'zod';

import { Configuration } from '@config/configuration';

const logger = new Logger('AuthConfig');

const DEFAULT_ACCESS_TTL = '1d';
const DEFAULT_REFRESH_TTL = '7d';

const ttlSchema = z
  .string()
  .regex(/^\d+[smhd]$/, 'TTL must be in format: 15m | 1h | 1d | 7d');

const authSchema = z.object({
  AUTH_JWT_ACCESS_SECRET: z
    .string()
    .min(32, 'AUTH_JWT_ACCESS_SECRET must be at least 32 characters'),
  AUTH_JWT_ACCESS_TTL: ttlSchema.default(DEFAULT_ACCESS_TTL),
  AUTH_JWT_REFRESH_SECRET: z
    .string()
    .min(32, 'AUTH_JWT_REFRESH_SECRET must be at least 32 characters'),
  AUTH_JWT_REFRESH_TTL: ttlSchema.default(DEFAULT_REFRESH_TTL),
});

export const authConfig = registerAs(Configuration.AUTH, () => {
  const parsed = authSchema.parse(process.env);

  logger.log('Auth config loaded.');

  return {
    access: {
      secret: parsed.AUTH_JWT_ACCESS_SECRET,
      ttl: parsed.AUTH_JWT_ACCESS_TTL,
    },
    refresh: {
      secret: parsed.AUTH_JWT_REFRESH_SECRET,
      ttl: parsed.AUTH_JWT_REFRESH_TTL,
    },
  };
});

export type AuthConfig = ConfigType<typeof authConfig>;
