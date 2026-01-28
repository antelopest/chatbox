export type TokenType = 'access' | 'refresh';

interface BaseJwtPayload {
  sub: string;
  type: TokenType;
}

export interface AccessJwtPayload extends BaseJwtPayload {
  type: 'access';
  email: string;
}

export interface RefreshJwtPayload extends BaseJwtPayload {
  type: 'refresh';
  jti: string;
}

export type JwtPayload = AccessJwtPayload | RefreshJwtPayload;
