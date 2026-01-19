import { Injectable, UnauthorizedException } from '@nestjs/common';

import { type LoginInput, type RegisterInput } from '@packages/validators';

@Injectable()
export class AuthService {
  async register(registerInput: RegisterInput): Promise<number> {
    console.log(registerInput);

    return Promise.resolve(1);
  }

  async login(loginInput: LoginInput): Promise<number> {
    console.log(loginInput);

    return Promise.resolve(1);
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
