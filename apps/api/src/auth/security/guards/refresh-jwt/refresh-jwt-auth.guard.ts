import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { SecurityProvidersEnum } from 'src/auth/security/enums';

@Injectable()
export class RefreshJwtAuthGuard extends AuthGuard(
  SecurityProvidersEnum.refreshJwt,
) {}
