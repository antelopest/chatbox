import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import type { Request, Response } from 'express';

import { GoogleAuthGuard } from 'src/auth/providers/guards/google/google-auth.guard';
import { FacebookAuthGuard } from 'src/auth/providers/guards/facebook/facebook-auth.guard';
import { AppleAuthGuard } from 'src/auth/providers/guards/apple/apple-auth.guard';

import { AuthCookieService, AuthService } from 'src/auth/services';

import { ZodValidationPipe } from '@common/pipes/validation/zod-validation.pipe';

import type {
  AuthResponse,
  AuthTokens,
  RegisterUser,
} from '@packages/contracts';
import { RegisterUserSchema } from '@packages/validators';
import { LocalAuthGuard } from 'src/auth/providers';
import { type UserEntity } from '@users/entities';
import {
  AccessJwtAuthGuard,
  RefreshJwtAuthGuard,
} from 'src/auth/security/guards';

type RequestLogin = Request & { user: UserEntity };
type RequestRefresh = Request & { user: { userId: string; jti: string } };

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly authCookieService: AuthCookieService,
  ) {}

  @Post('register')
  @UsePipes(new ZodValidationPipe(RegisterUserSchema))
  async register(
    @Body() registerUser: RegisterUser,
    @Res({ passthrough: true }) response: Response,
  ) {
    const authResponse: AuthResponse =
      await this.authService.register(registerUser);

    this.authCookieService.setAuthCookie(response, authResponse.tokens);

    return authResponse;
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(
    @Req() request: RequestLogin,
    @Res({ passthrough: true }) response: Response,
  ) {
    const authResponse: AuthResponse = await this.authService.login(
      request.user,
    );

    this.authCookieService.setAuthCookie(response, authResponse.tokens);

    return authResponse;
  }

  @Get('check')
  @UseGuards(AccessJwtAuthGuard)
  check() {
    return {
      ok: true,
    };
  }

  @Post('refresh')
  @UseGuards(RefreshJwtAuthGuard)
  async refresh(
    @Req()
    request: RequestRefresh,
    @Res({ passthrough: true }) response: Response,
  ) {
    const authTokens: AuthTokens = await this.authService.refresh(
      request.user.userId,
      request.user.jti,
    );

    this.authCookieService.setAuthCookie(response, authTokens);

    return authTokens;
  }

  @Post('logout')
  @UseGuards(RefreshJwtAuthGuard)
  logout(
    @Req()
    request: RequestRefresh,
    @Res({ passthrough: true }) res: Response,
  ) {
    this.authCookieService.clearAuthCookie(res);

    return this.authService.logout(request.user.userId, request.user.jti);
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  google() {}

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  googleCallback() {}

  @Get('facebook')
  @UseGuards(FacebookAuthGuard)
  facebook() {}

  @Get('facebook/callback')
  @UseGuards(FacebookAuthGuard)
  facebookCallback() {}

  @Get('apple')
  @UseGuards(AppleAuthGuard)
  apple() {}

  @Get('apple/callback')
  @UseGuards(AppleAuthGuard)
  appleCallback() {}
}
