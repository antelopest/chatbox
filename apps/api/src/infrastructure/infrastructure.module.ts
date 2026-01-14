import { Module } from '@nestjs/common';
import { MongoModule } from './mongo/mongo.module';
import { RedisModule } from './redis';

@Module({
  imports: [MongoModule, RedisModule],
  exports: [MongoModule, RedisModule],
})
export class InfrastructureModule {}
