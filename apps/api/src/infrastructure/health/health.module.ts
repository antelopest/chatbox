import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';

import { HealthController } from './controllers';
import { MongoHealthIndicator, RedisHealthIndicator } from './indicators';

@Module({
  imports: [TerminusModule],
  controllers: [HealthController],
  providers: [RedisHealthIndicator, MongoHealthIndicator],
})
export class HealthModule {}
