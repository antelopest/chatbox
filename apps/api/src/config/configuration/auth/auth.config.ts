import { Logger } from '@nestjs/common';
import { registerAs, type ConfigType } from '@nestjs/config';
import type { StringValue } from 'ms';
import * as z from 'zod';

import { Configuration } from '@config/configuration';
import ms from 'ms';

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

const toSeconds = (ttl: StringValue): number => {
  const value = ms(ttl);

  if (typeof value !== 'number') {
    throw new Error(`Invalid TTL value: ${ttl}`);
  }

  return Math.floor(value / 1000);
};

export const authConfig = registerAs(Configuration.AUTH, () => {
  const parsed = authSchema.parse(process.env);

  logger.log(`${Configuration.AUTH} config loaded.`);

  const accessTtl = parsed.AUTH_JWT_ACCESS_TTL as StringValue;
  const accessTtlSeconds = toSeconds(accessTtl);

  const refreshTtl = parsed.AUTH_JWT_REFRESH_TTL as StringValue;
  const refreshTtlSeconds = toSeconds(refreshTtl);

  return {
    access: {
      secret: parsed.AUTH_JWT_ACCESS_SECRET,
      ttl: accessTtl,
      ttlSeconds: accessTtlSeconds,
    },
    refresh: {
      secret: parsed.AUTH_JWT_REFRESH_SECRET,
      ttl: refreshTtl,
      ttlSeconds: refreshTtlSeconds,
    },
  };
});

export type AuthConfig = ConfigType<typeof authConfig>;
