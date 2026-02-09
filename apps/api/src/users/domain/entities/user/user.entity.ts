export class UserEntity {
  readonly id: string;
  readonly email: string;
  readonly username: string;
  readonly passwordHash: string;
  readonly profile?: {
    readonly displayName?: string | null;
  };
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor(params: {
    id: string;
    email: string;
    username: string;
    passwordHash: string;
    profile?: { displayName: string | null };
    createdAt: Date;
    updatedAt: Date;
  }) {
    Object.assign(this, params);
  }
}
