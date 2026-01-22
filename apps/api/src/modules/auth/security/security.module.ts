import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AccessJwtAuthGuard, RefreshJwtAuthGuard } from './guards';
import { AccessJwtStrategy, RefreshJwtStrategy } from './strategies';

@Module({
  imports: [PassportModule.register({ session: false }), JwtModule],
  providers: [
    AccessJwtStrategy,
    RefreshJwtStrategy,
    AccessJwtAuthGuard,
    RefreshJwtAuthGuard,
  ],
  exports: [JwtModule, AccessJwtAuthGuard, RefreshJwtAuthGuard],
})
export class SecurityModule {}
