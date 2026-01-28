import { Inject, Injectable } from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

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
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
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
