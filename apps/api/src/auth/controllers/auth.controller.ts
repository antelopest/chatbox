import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import type { Request } from 'express';

import { GoogleAuthGuard } from 'src/auth/providers/guards/google/google-auth.guard';
import { FacebookAuthGuard } from 'src/auth/providers/guards/facebook/facebook-auth.guard';
import { AppleAuthGuard } from 'src/auth/providers/guards/apple/apple-auth.guard';

import { AuthService } from 'src/auth/services';

import { ZodValidationPipe } from '@common/pipes/validation/zod-validation.pipe';

import type { RegisterUser } from '@packages/contracts';
import { RegisterUserSchema } from '@packages/validators';
import { LocalAuthGuard } from 'src/auth/providers';
import { type UserEntity } from '@users/entities';
import {
  AccessJwtAuthGuard,
  RefreshJwtAuthGuard,
} from 'src/auth/security/guards';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UsePipes(new ZodValidationPipe(RegisterUserSchema))
  register(@Body() registerUser: RegisterUser) {
    return this.authService.register(registerUser);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  login(@Req() request: Request & { user: UserEntity }) {
    return this.authService.login(request.user);
  }

  @Get('check')
  @UseGuards(AccessJwtAuthGuard)
  check() {
    return {
      ok: true,
    };
  }

  /* TODO перенести refreshToken с body в cookie */
  @Post('refresh')
  @UseGuards(RefreshJwtAuthGuard)
  refresh(
    @Req()
    request: Request & { user: { userId: string; refreshTokenId: string } },
  ) {
    return this.authService.refresh(
      request.user.userId,
      request.user.refreshTokenId,
    );
  }

  /* TODO перенести refreshToken с body в cookie */
  @Post('logout')
  @UseGuards(RefreshJwtAuthGuard)
  logout(
    @Req()
    request: Request & { user: { userId: string; refreshTokenId: string } },
  ) {
    return this.authService.logout(
      request.user.userId,
      request.user.refreshTokenId,
    );
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
