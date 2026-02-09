import { AccessJwtAuthGuard } from '@auth/security/guards';
import {
  Controller,
  Get,
  Query,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { UsersService } from '@users/application/services';
import { type AccessPayloadRequest } from '@common/types';
import { ZodValidationPipe } from '@common/pipes';
import { SearchUsersQuerySchema } from '@packages/validators';
import { SearchUsersQuery } from '@packages/contracts';

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

  @Get('search')
  @UseGuards(AccessJwtAuthGuard)
  @UsePipes(new ZodValidationPipe(SearchUsersQuerySchema))
  search(@Query() query: SearchUsersQuery) {
    return this.usersService.searchByUsernamePrefix(query.username);
  }
}
