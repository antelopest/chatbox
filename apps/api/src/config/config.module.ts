import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import {
  envConfig,
  authConfig,
  mongoConfig,
  redisConfig,
} from '@config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`env/.env.${process.env.NODE_ENV}`],
      load: [envConfig, authConfig, mongoConfig, redisConfig],
    }),
  ],
})
export class AppConfigModule {}
