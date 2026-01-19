import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local/local.strategy';
import { AuthService, PasswordService } from '@auth/services';
import { AuthController } from '@auth/controllers/auth.controller';

@Module({
  imports: [PassportModule],
  providers: [AuthService, PasswordService, LocalStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
