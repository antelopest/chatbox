import { Inject, Injectable } from '@nestjs/common';
import { type HealthIndicatorResult } from '@nestjs/terminus';
import Redis from 'ioredis';

import { REDIS_CLIENT } from '@infrastructure/redis';
import { down, up } from '@infrastructure/health/utils/health-result.util';

@Injectable()
export class RedisHealthIndicator {
  constructor(
    @Inject(REDIS_CLIENT)
    private readonly redis: Redis,
  ) {}

  async check(key = 'redis'): Promise<HealthIndicatorResult> {
    try {
      const result = await this.redis.ping();

      if (result !== 'PONG') {
        throw new Error('Redis ping failed');
      }

      return up(key);
    } catch (error) {
      return down(
        key,
        error instanceof Error ? error.message : 'Unknown error',
      );
    }
  }
}
