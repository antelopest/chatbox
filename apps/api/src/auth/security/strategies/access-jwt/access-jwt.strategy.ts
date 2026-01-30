import { Inject, Injectable } from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import type { Request } from 'express';

import { SecurityProvidersEnum } from 'src/auth/security/enums';
import { type AccessJwtPayload } from 'src/auth/security/types';
import { authConfig } from '@config/configuration';

@Injectable()
export class AccessJwtStrategy extends PassportStrategy(
  Strategy,
  SecurityProvidersEnum.accessJwt,
) {
  constructor(@Inject(authConfig.KEY) config: ConfigType<typeof authConfig>) {
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
          return cookies.accessToken ?? null;
        },
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      secretOrKey: config.access.secret,
    });
  }

  validate(payload: AccessJwtPayload) {
    return {
      userId: payload.sub,
      email: payload.email,
    };
  }
}
