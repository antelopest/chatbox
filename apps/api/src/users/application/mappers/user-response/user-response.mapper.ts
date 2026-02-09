import { type UserResponse } from '@packages/contracts';
import { UserResponseSchema } from '@packages/validators';
import { type UserEntity } from '@users/domain';

export class UserResponseMapper {
  static toResponse(user: UserEntity): UserResponse {
    return UserResponseSchema.parse({
      id: user.id,
      email: user.email,
      username: user.username ?? null,
      profile: {
        displayName: user.profile?.displayName ?? null,
      },
      createdAt: user.createdAt,
    });
  }
}
