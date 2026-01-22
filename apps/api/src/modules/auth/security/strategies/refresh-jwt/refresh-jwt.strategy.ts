// modules/security/strategies/refresh-jwt.strategy.ts
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import type { ConfigType } from '@nestjs/config';

import { authConfig } from '@config/configuration';

import { SecurityProvidersEnum } from '@auth/security/enums';
import { RefreshJwtPayload } from '@auth/security/types';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  SecurityProvidersEnum.refreshJwt,
) {
  constructor(@Inject(authConfig.KEY) config: ConfigType<typeof authConfig>) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      secretOrKey: config.refresh.secret,
    });
  }

  validate(payload: RefreshJwtPayload) {
    // TODO добавить проверку в REDIS => refreshTokenService.validate()
    if (!payload?.sub || !payload?.tokenId) {
      throw new UnauthorizedException();
    }

    return {
      userId: payload.sub,
      tokenId: payload.tokenId,
    };
  }
}
