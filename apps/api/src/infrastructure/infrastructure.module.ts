import { Module } from '@nestjs/common';
import { MongoModule } from './mongo/mongo.module';
import { RedisModule } from './redis';
import { HealthModule } from './health/health.module';

@Module({
  imports: [MongoModule, RedisModule, HealthModule],
  exports: [MongoModule, RedisModule],
})
export class InfrastructureModule {}
