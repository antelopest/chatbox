// modules/security/strategies/refresh-jwt.strategy.ts
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import type { ConfigType } from '@nestjs/config';

import { authConfig } from '@config/configuration';

import { SecurityProvidersEnum } from 'src/auth/security/enums';
import { type RefreshJwtPayload } from 'src/auth/security/types';
import { RefreshTokenStorage } from 'src/auth/security/storages';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  SecurityProvidersEnum.refreshJwt,
) {
  constructor(
    @Inject(authConfig.KEY) config: ConfigType<typeof authConfig>,
    private readonly refreshTokenStorage: RefreshTokenStorage,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      secretOrKey: config.refresh.secret,
    });
  }

  async validate(payload: RefreshJwtPayload) {
    if (payload.type !== 'refresh') {
      throw new UnauthorizedException('Invalid token type');
    }

    if (!payload?.sub || !payload?.jti) {
      throw new UnauthorizedException('Invalid token payload');
    }

    const exists = await this.refreshTokenStorage.exists(
      payload.sub,
      payload.jti,
    );

    if (!exists) {
      throw new UnauthorizedException('Refresh token revoked');
    }

    return {
      userId: payload.sub,
      jti: payload.jti,
    };
  }
}
