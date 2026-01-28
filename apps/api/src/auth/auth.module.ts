import { Module } from '@nestjs/common';

import { LocalStrategy } from '@auth/providers/strategies';
import {
  AuthService,
  PasswordService,
  UsernameService,
} from 'src/auth/services';
import { AuthController } from '@auth/controllers/auth.controller';

import { UsersModule } from '@users/users.module';
import { SecurityModule } from '@auth/security/security.module';

@Module({
  imports: [UsersModule, SecurityModule],
  providers: [AuthService, PasswordService, UsernameService, LocalStrategy],
  controllers: [AuthController],
  exports: [],
})
export class AuthModule {}
