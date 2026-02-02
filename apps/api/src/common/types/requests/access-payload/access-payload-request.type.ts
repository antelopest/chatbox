import type { Request } from 'express';
export type AccessPayload = { userId: string; email: string };
export type AccessPayloadRequest = Request & {
  user: AccessPayload;
};
