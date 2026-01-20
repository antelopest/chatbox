import { ErrorCode } from '@common/errors';
import { UsersService } from '@modules/users/services';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { type LoginInput, type RegisterInput } from '@packages/validators';
import { PasswordService } from './password.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly passwordService: PasswordService,
  ) {}

  async register(registerInput: RegisterInput): Promise<number> {
    console.log(registerInput);

    return Promise.resolve(1);
  }

  async login(loginInput: LoginInput): Promise<number> {
    console.log(loginInput);

    const { email, password } = loginInput;

    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException({
        code: ErrorCode.INVALID_CREDENTIALS,
        message: 'Invalid email or password',
      });
    }

    const isValid = await this.passwordService.verify(
      user.passwordHash,
      password,
    );

    if (!isValid) {
      throw new UnauthorizedException({
        code: ErrorCode.INVALID_CREDENTIALS,
        message: 'Invalid email or password',
      });
    }

    // const { passwordHash, ...safe } = user;

    // return safe;

    return 1;
  }

  async validateUser(email: string, password: string) {
    if (email === '' || password === '') {
      throw new UnauthorizedException('Invalid credentials');
    }

    return Promise.resolve({
      id: 'user-id',
      email,
      role: 'user',
    });
  }
}
