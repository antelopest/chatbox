export interface UserEntity {
  id: string;
  email: string;
  username?: string;
  passwordHash: string;
  profile?: {
    displayName?: string;
    avatarUrl?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
