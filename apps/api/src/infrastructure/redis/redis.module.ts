import { Module } from '@nestjs/common';
import { RedisConfig, redisConfig } from '@config/configuration';

import { createRedisClient } from './redis.client';

export const REDIS_CLIENT = Symbol('REDIS_CLIENT');

@Module({
  imports: [],
  providers: [
    {
      provide: REDIS_CLIENT,
      inject: [redisConfig.KEY],
      useFactory: (config: RedisConfig) => {
        const client = createRedisClient(config);
        client.connect();
        return client;
      },
    },
  ],
  exports: [REDIS_CLIENT],
})
export class RedisModule {}
