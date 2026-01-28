import { Inject, Injectable } from '@nestjs/common';
import { REDIS_CLIENT } from '@infrastructure/redis';
import Redis from 'ioredis';

@Injectable()
export class RefreshTokenStorage {
  constructor(
    @Inject(REDIS_CLIENT)
    private readonly redis: Redis,
  ) {}

  private key(userId: string, jti: string) {
    return `refresh:${userId}:${jti}`;
  }

  async save(userdId: string, jti: string, ttSeconds: number): Promise<void> {
    const key = this.key(userdId, jti);

    await this.redis.set(
      key,
      JSON.stringify({ userdId, jti, createdAt: Date.now() }),
      'EX',
      ttSeconds,
    );
  }

  async exists(userId: string, jti: string): Promise<boolean> {
    const key = this.key(userId, jti);
    return (await this.redis.exists(key)) === 1;
  }

  async remove(userId: string, jti: string): Promise<void> {
    const key = this.key(userId, jti);
    await this.redis.del(key);
  }
}
