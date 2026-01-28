import { Injectable } from '@nestjs/common';
import { UsersService } from '@users/services';
import { randomBytes } from 'crypto';

@Injectable()
export class UsernameService {
  constructor(private usersService: UsersService) {}

  private normalizeEmailPrefix(email: string): string {
    return email
      .split('@')[0]
      .toLowerCase()
      .replace(/\+.*/, '')
      .replace(/[^a-z0-9._]/g, '')
      .slice(0, 30);
  }

  private randomSuffix(length: number): string {
    return randomBytes(length)
      .toString('base64url')
      .slice(0, length)
      .toLowerCase();
  }

  async generateUniqueUsername(email: string): Promise<string> {
    const base = this.normalizeEmailPrefix(email);

    if (!(await this.usersService.findOneByUsername(base))) {
      return base;
    }

    /* TODO реализовать перебор */
    const candidate = `${base}_${this.randomSuffix(3)}`;

    if (!(await this.usersService.findOneByUsername(candidate))) {
      return candidate;
    }

    throw new Error('Failed generate unique username');
  }
}
