import type { Request } from 'express';
export type RefreshPayload = { userId: string; jti: string };
export type RefreshPayloadRequest = Request & {
  user: RefreshPayload;
};
