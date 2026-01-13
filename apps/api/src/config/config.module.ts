import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { envConfig, authConfig, mongoConfig } from '@config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`env/.env.${process.env.NODE_ENV}`],
      load: [envConfig, authConfig, mongoConfig],
    }),
  ],
})
export class AppConfigModule {}
