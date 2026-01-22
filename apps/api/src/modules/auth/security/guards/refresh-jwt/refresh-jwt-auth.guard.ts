import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { SecurityProvidersEnum } from '@auth/security/enums';

@Injectable()
export class RefreshJwtAuthGuard extends AuthGuard(
  SecurityProvidersEnum.refreshJwt,
) {}
