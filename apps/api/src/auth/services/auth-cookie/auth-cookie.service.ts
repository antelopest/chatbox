import { authConfig, envConfig, Environment } from '@config/configuration';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { AuthTokens } from '@packages/contracts';

import type { Response } from 'express';

@Injectable()
export class AuthCookieService {
  baseCookieOptions: {
    httpOnly: boolean;
    sameSite: 'lax';
    secure: boolean;
    path: string;
  };

  constructor(
    @Inject(authConfig.KEY)
    private readonly authCongiguration: ConfigType<typeof authConfig>,
    @Inject(envConfig.KEY)
    private readonly envCongiguration: ConfigType<typeof envConfig>,
  ) {
    this.baseCookieOptions = {
      httpOnly: true,
      sameSite: 'lax' as const,
      secure: this.envCongiguration.env === Environment.Production,
      path: '/',
    };
  }

  setAuthCookie(res: Response, tokens: AuthTokens) {
    res.cookie('accessToken', tokens.accessToken, {
      ...this.baseCookieOptions,
      maxAge: this.authCongiguration.access.ttlSeconds * 1000,
    });

    res.cookie('refreshToken', tokens.refreshToken, {
      ...this.baseCookieOptions,
      maxAge: this.authCongiguration.refresh.ttlSeconds * 1000,
    });
  }

  clearAuthCookie(res: Response) {
    res.clearCookie('accessToken', this.baseCookieOptions);
    res.clearCookie('refreshToken', this.baseCookieOptions);
  }
}
