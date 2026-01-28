import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AccessJwtAuthGuard, RefreshJwtAuthGuard } from './guards';
import { AccessJwtStrategy, RefreshJwtStrategy } from './strategies';
import { RefreshTokenStorage } from './storages';
import { RedisModule } from '@infrastructure/redis';

@Module({
  imports: [
    RedisModule,
    PassportModule.register({ session: false }),
    JwtModule,
  ],
  providers: [
    AccessJwtStrategy,
    RefreshJwtStrategy,
    AccessJwtAuthGuard,
    RefreshJwtAuthGuard,
    RefreshTokenStorage,
  ],
  exports: [
    JwtModule,
    AccessJwtAuthGuard,
    RefreshJwtAuthGuard,
    RefreshTokenStorage,
  ],
})
export class SecurityModule {}
