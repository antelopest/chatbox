import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

import { envConfig, EnvConfig } from '@config/configuration/env.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get<EnvConfig>(envConfig.KEY);
  const { port, env, apiPrefix, applicationName } = config;

  app.setGlobalPrefix(apiPrefix);

  await app.listen(port);

  const logger = new Logger('Bootstrap');
  logger.log(
    `Application ${applicationName} is running on: http://localhost:${port}`,
  );
  logger.log(`Environment mode: ${env}`);
}

bootstrap();
