import { Module } from '@nestjs/common';

import { AppConfigModule } from '@config/config.module';
import { InfrastructureModule } from '@infrastructure/infrastructure.module';
import { UsersModule } from '@users/users.module';

@Module({
  imports: [AppConfigModule, InfrastructureModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
