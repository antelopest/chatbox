import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { MongooseHealthIndicator } from '@nestjs/terminus';
import { Connection } from 'mongoose';

import { up, down } from '@infrastructure/health/utils';
import { MONGO_NAME_CONNECTION } from '@infrastructure/mongo';

@Injectable()
export class MongoHealthIndicator {
  constructor(
    private readonly mongoose: MongooseHealthIndicator,
    @InjectConnection(MONGO_NAME_CONNECTION)
    private readonly connection: Connection,
  ) {}

  async check(key = 'mongo') {
    try {
      await this.mongoose.pingCheck(key, {
        connection: this.connection,
      });

      return up(key);
    } catch (error) {
      return down(
        key,
        error instanceof Error ? error.message : 'MongoDB ping failed',
      );
    }
  }
}
