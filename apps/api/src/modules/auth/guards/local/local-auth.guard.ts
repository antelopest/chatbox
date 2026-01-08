import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthProvidersEnum } from '@auth/enums/auth-providers.enum';

@Injectable()
export class LocalAuthGuard extends AuthGuard(AuthProvidersEnum.local) {}
