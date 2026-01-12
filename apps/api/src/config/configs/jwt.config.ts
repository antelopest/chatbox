import { registerAs } from '@nestjs/config';

export const jwtConfig = registerAs('jwt', () => ({
  accessSecret: process.env.AUTH_JWT_ACCESS_SECRET,
  accessTtl: process.env.AUTH_JWT_ACCESS_TTL,

  refreshSecret: process.env.AUTH_JWT_REFRESH_SECRET,
  refreshTtl: process.env.AUTH_JWT_REFRESH_TTL,
}));
