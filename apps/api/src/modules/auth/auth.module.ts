import { Module } from '@nestjs/common';

import { LocalStrategy } from '@auth/providers/strategies';
import { AuthService, PasswordService } from '@auth/services';
import { AuthController } from '@auth/controllers/auth.controller';

import { UsersModule } from '@users/users.module';
import { SecurityModule } from '@auth/security/security.module';

@Module({
  imports: [UsersModule, SecurityModule],
  providers: [AuthService, PasswordService, LocalStrategy],
  controllers: [AuthController],
  exports: [],
})
export class AuthModule {}
