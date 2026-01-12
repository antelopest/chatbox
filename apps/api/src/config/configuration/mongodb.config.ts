import { registerAs } from '@nestjs/config';

export const mongodbConfig = registerAs('mongodb', () => ({
  host: process.env.MONGO_HOST,
  port: Number(process.env.MONGO_PORT),
  db: process.env.MONGO_DB,
  user: process.env.MONGO_USER,
  password: process.env.MONGO_PASSWORD,
}));
