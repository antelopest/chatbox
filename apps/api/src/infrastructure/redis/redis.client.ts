import Redis from 'ioredis';
import { Logger } from '@nestjs/common';

import { type RedisConfig } from '@config/configuration';

const logger = new Logger('Redis');

export const createRedisClient = (config: RedisConfig) => {
  const client = new Redis({
    host: config.host,
    port: config.port,
    lazyConnect: true,
    maxRetriesPerRequest: null,
  });

  client.on('connect', () => {
    logger.log('Redis socket connected');
  });

  client.on('ready', () => {
    logger.log(`Redis is ready`);
  });

  client.on('error', (error) => {
    logger.error('Redis error', error);
  });

  client.on('close', () => {
    logger.warn('Redis connection closed');
  });

  client.on('reconnecting', () => {
    logger.warn('Redis reconnecting...');
  });

  return client;
};
