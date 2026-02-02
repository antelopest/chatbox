// modules/security/strategies/refresh-jwt.strategy.ts
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import type { ConfigType } from '@nestjs/config';
import type { Request } from 'express';

import { authConfig } from '@config/configuration';

import { SecurityProvidersEnum } from 'src/auth/security/enums';
import { type RefreshJwtPayload } from 'src/auth/security/types';
import { RefreshTokenStorage } from 'src/auth/security/storages';
import { type RefreshPayload } from '@common/types';

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
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const header = request?.headers?.cookie;
          if (!header) return null;
          const cookies = Object.fromEntries(
            header.split(';').map((part) => {
              const [key, ...rest] = part.trim().split('=');
              return [key, decodeURIComponent(rest.join('='))];
            }),
          );
          return cookies.refreshToken ?? null;
        },
        ExtractJwt.fromBodyField('refreshToken'),
      ]),
      secretOrKey: config.refresh.secret,
    });
  }

  async validate(payload: RefreshJwtPayload): Promise<RefreshPayload> {
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

    const refreshPayload: RefreshPayload = {
      userId: payload.sub,
      jti: payload.jti,
    };

    return refreshPayload;
  }
}
