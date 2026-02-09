// infrastructure/repositories/users/user.persistence.mapper.ts
import { type UserDocument } from '@users/infrastructure/schemas';
import { UserEntity } from '@users/domain/entities';

export class UserPersistenceMapper {
  static toEntity(doc: UserDocument): UserEntity {
    return new UserEntity({
      id: doc._id.toString(),
      email: doc.email,
      username: doc.username,
      passwordHash: doc.passwordHash,
      profile: {
        displayName: doc.profile.displayName,
      },
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  }
}
