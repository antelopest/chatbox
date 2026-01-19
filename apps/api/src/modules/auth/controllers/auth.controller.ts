import { Controller, Get, UseGuards, UsePipes } from '@nestjs/common';

import { GoogleAuthGuard } from '../guards/google/google-auth.guard';
import { FacebookAuthGuard } from '../guards/facebook/facebook-auth.guard';
import { AppleAuthGuard } from '../guards/apple/apple-auth.guard';

import { AuthService } from '../services';
import { ZodValidationPipe } from 'src/common/pipes/validation/zod-validation.pipe';


import { AuthSchema } from '@packa'
@Controller({
  path: 'auth',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('login')
  @UsePipes(new ZodValidationPipe(AuthSchema))

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
