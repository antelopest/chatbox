import * as z from 'zod';

export const envSchema = z.object({
  /* ENV */

  /* NODE_ENV ['development', 'production'] */
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  /* PORT */
  PORT: z.coerce.number().int().min(1).max(65535).default(3000),

  /* AUTH */
  AUTH_JWT_ACCESS_SECRET: z
    .string()
    .min(32, 'AUTH_JWT_ACCESS_SECRET must be at least 32 characters'),
  AUTH_JWT_ACCESS_TTL: z.string().default('1d'),
  AUTH_JWT_REFRESH_SECRET: z
    .string()
    .min(32, 'AUTH_JWT_REFRESH_SECRET must be at least 32 characters'),
  AUTH_JWT_REFRESH_TTL: z.string().default('7d'),

  /* DATABASE */

  /* MONGODB */
  MONGO_HOST: z.string(),
  MONGO_PORT: z.coerce.number().int().min(1).max(65535).default(27017),
  MONGO_DB: z.string(),
  MONGO_USER: z.string(),
  MONGO_PASSWORD: z.string(),

  /* REDIS */

  /* POSTGRESQL */
});

export type Env = z.infer<typeof envSchema>;
