import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';

import { RedisModule } from '@infrastructure/redis';
import { MongoModule } from '@infrastructure/mongo';

import { HealthController } from './controllers';
import { MongoHealthIndicator, RedisHealthIndicator } from './indicators';

@Module({
  imports: [TerminusModule, RedisModule, MongoModule],
  controllers: [HealthController],
  providers: [RedisHealthIndicator, MongoHealthIndicator],
})
export class HealthModule {}
