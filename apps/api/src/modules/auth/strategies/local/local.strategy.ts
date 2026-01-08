import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from 'src/modules/auth/services/auth.service';

import { AuthProvidersEnum } from '@modules/auth/enums/auth-providers.enum';

export class LocalStrategy extends PassportStrategy(Strategy, AuthProvidersEnum.local) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string) {
    return this.authService.validateUser(email, password);
  }
}
