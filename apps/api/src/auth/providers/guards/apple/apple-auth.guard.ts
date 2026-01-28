import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthProvidersEnum } from 'src/auth/providers/enums/auth-providers.enum';

@Injectable()
export class AppleAuthGuard extends AuthGuard(AuthProvidersEnum.apple) {}
