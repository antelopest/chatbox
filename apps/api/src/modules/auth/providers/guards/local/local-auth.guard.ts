import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthProvidersEnum } from '@auth/providers/enums/auth-providers.enum';
import { LoginUserSchema } from '@packages/validators';

@Injectable()
export class LocalAuthGuard extends AuthGuard(AuthProvidersEnum.local) {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    LoginUserSchema.parse(req.body);

    return super.canActivate(context) as Promise<boolean>;
  }
}
