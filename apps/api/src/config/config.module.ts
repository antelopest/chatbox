import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// import { envSchema } from '@config/zod-schemas/env.zod-schema';
import { envConfig } from './configuration/env.config';

// import { envConfig } from '@config/configuration/env.config';
// import { authConfig } from '@config/configuration/auth.config';
// import { mongodbConfig } from '@config/configuration/mongodb.config';
// import configuration from './configuration/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`env/.env.${process.env.NODE_ENV}`, 'env/.env'],
      load: [envConfig],
    }),
  ],
})
export class AppConfigModule {}
