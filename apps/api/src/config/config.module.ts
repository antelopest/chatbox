import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { envSchema } from './zod-schemas/env.zod-schema';

import { envConfig } from './configs/env.config';
import { jwtConfig } from './configs/jwt.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['env/.env', 'env/.env.${process.env.NODE_ENV}'],
      validate: (env) => envSchema.parse(env),
      load: [envConfig, jwtConfig],
    }),
  ],
})
export class AppConfigModule {}
