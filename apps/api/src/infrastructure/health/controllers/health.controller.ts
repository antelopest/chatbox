import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';

import {
  MongoHealthIndicator,
  RedisHealthIndicator,
} from '@infrastructure/health/indicators';
import { HEALTH_STATUS } from '@infrastructure/health/types';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private redis: RedisHealthIndicator,
    private mongo: MongoHealthIndicator,
  ) {}

  @Get('live')
  @HealthCheck()
  live() {
    return this.health.check([
      () => ({
        app: { status: HEALTH_STATUS.UP },
      }),
    ]);
  }

  @Get('ready')
  @HealthCheck()
  ready() {
    return this.health.check([
      () => this.redis.check('redis'),
      () => this.mongo.check('mongo'),
    ]);
  }
}
