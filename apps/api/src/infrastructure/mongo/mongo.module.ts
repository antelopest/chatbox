import { mongoConfig } from '@config/configuration';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { createMongoConnection } from './mongo.connection';
import { MongoConnection } from './mongo-connection.enum';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      connectionName: MongoConnection.MAIN,
      inject: [mongoConfig.KEY],
      useFactory: createMongoConnection,
    }),
  ],
  exports: [MongooseModule],
})
export class MongoModule {}
