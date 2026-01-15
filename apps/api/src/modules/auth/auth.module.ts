import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local/local.strategy';
import { AuthService, PasswordService } from '@auth/services';

@Module({
  imports: [PassportModule],
  providers: [AuthService, PasswordService, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}
