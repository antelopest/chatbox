import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
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
