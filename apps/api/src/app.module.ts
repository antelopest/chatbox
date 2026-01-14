import { Module } from '@nestjs/common';

import { AppConfigModule } from '@config/config.module';
import { InfrastructureModule } from '@infrastructure/infrastructure.module';

@Module({
  imports: [AppConfigModule, InfrastructureModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
