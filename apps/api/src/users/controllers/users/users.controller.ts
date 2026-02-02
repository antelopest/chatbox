import { AccessJwtAuthGuard } from '@auth/security/guards';
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UsersService } from '@users/services';
import { type AccessPayloadRequest } from '@common/types';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  @UseGuards(AccessJwtAuthGuard)
  getProfile(
    @Req()
    request: AccessPayloadRequest,
  ) {
    return this.usersService.getProfile(request.user.userId);
  }
}
