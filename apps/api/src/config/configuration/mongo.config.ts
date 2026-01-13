import { Logger } from '@nestjs/common';
import { registerAs, ConfigType } from '@nestjs/config';
import * as z from 'zod';

const logger = new Logger('MongoConfig');

export const MONGO_CONFIG_NAMESPACE = 'mongo';

const DEFAUL_MONGO_PORT = 27017;
const DEFAULT_MONGO_DEBUG = false;
const DEFAULT_MONGO_MIN_POOL_SIZE = 0;
const DEFAULT_MONGO_MAX_POOL_SIZE = 10;
const DEFAULT_MONGO_SELECTION_TIMEOUT_MS = 5_000;
const DEFAULT_MONGO_SOCKET_TIMEOUT_MS = 45_000;

const boolFromString = z
  .union([z.literal('true'), z.literal('false')])
  .transform((v) => v === 'true');

const intFromString = (min: number, max: number) =>
  z
    .string()
    .regex(/^\d+$/, 'Must be a number')
    .transform(Number)
    .pipe(z.number().int().min(min).max(max));

const mongoSchema = z.object({
  MONGO_HOST: z.string().min(1),
  MONGO_PORT: intFromString(1, 65535).default(DEFAUL_MONGO_PORT),
  MONGO_DB_NAME: z.string().min(1, 'MONGO_DB_NAME is required'),
  MONGO_USER: z.string().optional(),
  MONGO_PASSWORD: z.string().optional(),
  MONGO_DEBUG: boolFromString.default(DEFAULT_MONGO_DEBUG),
  MONGO_MIN_POOL_SIZE: intFromString(0, 1_000).default(
    DEFAULT_MONGO_MIN_POOL_SIZE,
  ),
  MONGO_MAX_POOL_SIZE: intFromString(1, 1_000).default(
    DEFAULT_MONGO_MAX_POOL_SIZE,
  ),
  MONGODB_SERVER_SELECTION_TIMEOUT_MS: intFromString(100, 120_000).default(
    DEFAULT_MONGO_SELECTION_TIMEOUT_MS,
  ),
  MONGODB_SOCKET_TIMEOUT_MS: intFromString(100, 300_000).default(
    DEFAULT_MONGO_SOCKET_TIMEOUT_MS,
  ),
});

export const mongoConfig = registerAs(MONGO_CONFIG_NAMESPACE, () => {
  const parsed = mongoSchema.parse(process.env);

  const auth: string =
    parsed.MONGO_USER && parsed.MONGO_PASSWORD
      ? `${encodeURIComponent(parsed.MONGO_USER)}:${encodeURIComponent(parsed.MONGO_PASSWORD)}@`
      : '';

  const uri = `mongodb://${auth}${parsed.MONGO_HOST}:${parsed.MONGO_PORT}`;

  logger.log(`Mongo config loaded.`);

  return {
    uri,
    dbName: parsed.MONGO_DB_NAME,
    debug: parsed.MONGO_DEBUG,
    minPoolSize: parsed.MONGO_MIN_POOL_SIZE,
    maxPoolSize: parsed.MONGO_MAX_POOL_SIZE,
    serverSelectionTimeoutMS: parsed.MONGODB_SERVER_SELECTION_TIMEOUT_MS,
    socketTimeoutMS: parsed.MONGODB_SOCKET_TIMEOUT_MS,
  };
});

export type MongoConfig = ConfigType<typeof mongoConfig>;
