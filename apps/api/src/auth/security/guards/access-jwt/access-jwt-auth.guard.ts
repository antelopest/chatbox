import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { SecurityProvidersEnum } from 'src/auth/security/enums';

@Injectable()
export class AccessJwtAuthGuard extends AuthGuard(
  SecurityProvidersEnum.accessJwt,
) {}
