import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from 'src/auth/services/auth/auth.service';

import { AuthProvidersEnum } from 'src/auth/providers/enums/auth-providers.enum';
import { type UserEntity } from '@users/entities';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(
  Strategy,
  AuthProvidersEnum.local,
) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<UserEntity> {
    return this.authService.validateUser(email, password);
  }
}
