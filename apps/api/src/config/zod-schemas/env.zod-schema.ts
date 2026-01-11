import * as z from 'zod';

export const envSchema = z.object({
  /* APP */

  /* NODE_ENV ['development', 'production'] */
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  /* PORT */
  PORT: z.coerce.number().int().min(1).max(65535).default(3000),

  /* JWT */
  JWT_ACCESS_SECRET: z.string().min(32, 'JWT_ACCESS_SECRET must be at least 32 characters'),
  JWT_REFRESH_SECRET: z.string().min(32, 'JWT_REFRESH_SECRET must be at least 32 characters'),
  JWT_ACCESS_TTL: z.string().default('1d'),
  JWT_REFRESH_TTL: z.string().default('7d'),

  /* DATABASE */
  // MONGO_URI: z.string().min(1, 'MONGO_URI is required'),
  // MONGO_DB: z.string().min(1, 'MONGO_DB is required'),
});

export type Env = z.infer<typeof envSchema>;
