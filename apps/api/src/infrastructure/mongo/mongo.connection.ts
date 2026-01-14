import mongoose, { Connection } from 'mongoose';
import { MongooseModuleOptions } from '@nestjs/mongoose';
import { Logger } from '@nestjs/common';

import { MongoConfig } from '@config/configuration';

const logger = new Logger('MongoDB');

export const createMongoConnection = (
  config: MongoConfig,
): MongooseModuleOptions => {
  mongoose.set('debug', config.debug);

  return {
    uri: config.uri,
    dbName: config.dbName,
    minPoolSize: config.minPoolSize,
    maxPoolSize: config.maxPoolSize,
    serverSelectionTimeoutMS: config.serverSelectionTimeoutMS,
    socketTimeoutMS: config.socketTimeoutMS,
    connectionFactory: (connection: Connection) => {
      logger.log(`Connected to MongoDB (${connection.name})`);

      connection.on('error', (error) => {
        logger.error(`MongoDB (${connection.name}) error`, error);
      });

      connection.on('disconnected', () => {
        logger.warn(`MongoDB (${connection.name}) disconnected`);
      });

      connection.on('reconnected', () => {
        logger.warn(`MongoDB (${connection.name}) reconnected `);
      });

      connection.on('close', () => {
        logger.warn(`MongoDB (${connection.name}) closed`);
      });

      return connection;
    },
  };
};
