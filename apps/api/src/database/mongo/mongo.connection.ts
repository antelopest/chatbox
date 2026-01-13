import mongoose from 'mongoose';

import { MongoConfig } from '@config/configuration';

export const createMongoConnection = (config: MongoConfig) => {
  mongoose.set('debug', config.debug);

  console.log('113123');

  return {
    uri: config.uri,
    dbName: config.dbName,
    minPoolSize: config.minPoolSize,
    maxPoolSize: config.maxPoolSize,
    serverSelectionTimeoutMS: config.serverSelectionTimeoutMS,
    socketTimeoutMS: config.socketTimeoutMS,
    connectionFactory: (connection) => {
      connection.on('connected', () => {
        console.log('CONNECT CREATE');
      });

      return connection;
    },
  };
};
