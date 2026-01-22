import { UserResponse } from '@packages/contracts';
import { UserResponseSchema } from '@packages/validators';
import { UserEntity } from '@users/entities';

export class UserMapper {
  static toResponse(user: UserEntity): UserResponse {
    return UserResponseSchema.parse({
      id: user.id,
      email: user.email,
      username: user.username ?? null,
      profile: {
        displayName: user.profile?.displayName ?? null,
      },
    });
  }
}
