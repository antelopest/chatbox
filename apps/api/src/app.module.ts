import { Module } from '@nestjs/common';

import { AppConfigModule } from '@config/config.module';
import { InfrastructureModule } from '@infrastructure/infrastructure.module';
import { UsersModule } from '@users/users.module';
import { ChangelogModule } from '@changelog/changelog.module';
import { AuthModule } from '@auth/auth.module';
import { DialogsModule } from '@dialogs/dialogs.module';

@Module({
  imports: [
    AppConfigModule,
    InfrastructureModule,
    UsersModule,
    AuthModule,
    DialogsModule,
    ChangelogModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
