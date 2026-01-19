import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';

import { GoogleAuthGuard } from '@auth/guards/google/google-auth.guard';
import { FacebookAuthGuard } from '@auth/guards/facebook/facebook-auth.guard';
import { AppleAuthGuard } from '@auth/guards/apple/apple-auth.guard';

import { AuthService } from '@auth/services';

import { ZodValidationPipe } from '@common/pipes/validation/zod-validation.pipe';

import {
  LoginSchema,
  type LoginInput,
  RegisterSchema,
  type RegisterInput,
} from '@packages/validators';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UsePipes(new ZodValidationPipe(RegisterSchema))
  register(@Body() registerInput: RegisterInput) {
    return this.authService.register(registerInput);
  }

  @Get('login')
  @UsePipes(new ZodValidationPipe(LoginSchema))
  login(@Body() loginInput: LoginInput) {
    return this.authService.login(loginInput);
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
