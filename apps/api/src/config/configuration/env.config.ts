import { Logger } from '@nestjs/common';
import { ConfigType, registerAs } from '@nestjs/config';
import * as z from 'zod';

const logger = new Logger('EnvConfig');

export const ENV_CONFIG_NAMESPACE = 'env';

export enum Environment {
  Development = 'development',
  Production = 'production',
}

const DEFAULT_ENV = Environment.Development;
const DEFAULT_PORT = 3000;
const DEFAULT_API_PREFIX = 'api';
const DEFAULT_APP_NAME = 'chat api';

const envSchema = z.object({
  NODE_ENV: z
    .enum([Environment.Development, Environment.Production] as const)
    .default(DEFAULT_ENV),
  PORT: z
    .string()
    .regex(/^\d+$/, 'Must be a number')
    .transform(Number)
    .pipe(z.number().int().min(1).max(65535))
    .default(DEFAULT_PORT),
  API_PREFIX: z.string().default(DEFAULT_API_PREFIX),
  APP_NAME: z.string().default(DEFAULT_APP_NAME),
});

export const envConfig = registerAs(ENV_CONFIG_NAMESPACE, () => {
  const parsed = envSchema.parse(process.env);

  logger.log(`Environment config loaded: ${parsed.NODE_ENV}, ${parsed.PORT}`);

  return {
    env: parsed.NODE_ENV,
    port: parsed.PORT,
    apiPrefix: parsed.API_PREFIX,
    applicationName: parsed.APP_NAME,
  };
});

export type EnvConfig = ConfigType<typeof envConfig>;
