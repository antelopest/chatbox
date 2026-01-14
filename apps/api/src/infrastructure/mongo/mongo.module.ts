import { mongoConfig } from '@config/configuration';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { createMongoConnection } from './mongo.connection';

export const MONGO_NAME_CONNECTION = 'mongoConnection';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      connectionName: MONGO_NAME_CONNECTION,
      inject: [mongoConfig.KEY],
      useFactory: createMongoConnection,
    }),
  ],
  exports: [MongooseModule],
})
export class MongoModule {}
