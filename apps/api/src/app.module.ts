import { Module } from '@nestjs/common';

import { AppConfigModule } from '@config/config.module';
import { InfrastructureModule } from '@infrastructure/infrastructure.module';
import { UsersModule } from '@users/users.module';
import { ChangelogModule } from '@modules/changelog/changelog.module';

@Module({
  imports: [
    AppConfigModule,
    InfrastructureModule,
    UsersModule,
    ChangelogModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
