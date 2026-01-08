import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthProvidersEnum } from '@auth/enums/auth-providers.enum';

@Injectable()
export class GoogleAuthGuard extends AuthGuard(AuthProvidersEnum.google) {}
