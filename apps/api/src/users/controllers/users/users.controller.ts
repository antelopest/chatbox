import { AccessJwtAuthGuard } from '@auth/security/guards';
import type { Request } from 'express';
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UsersService } from '@users/services';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  @UseGuards(AccessJwtAuthGuard)
  getProfile(
    @Req()
    request: Request & {
      user: {
        userId: string;
        email: string;
      };
    },
  ) {
    return this.usersService.getProfile(request.user.userId);
  }
}
