import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './services/auth.service';
import { LocalStrategy } from './strategies/local/local.strategy';

@Module({
  imports: [PassportModule],
  providers: [AuthService, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}
