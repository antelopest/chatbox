import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { UserEntity } from '@users/domain/entities';
import { UsersRepository } from '@users/infrastructure/repositories';
import { type CreateUserCommand } from '@users/application/commands';
import { UserResponse } from '@packages/contracts';
import { UserResponseMapper } from '@users/application/mappers';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  private async uniqueEmail(email: string) {
    const byEmail = await this.usersRepository.findOneByEmail(email);

    if (byEmail) {
      throw new ConflictException('Email already in use');
    }
  }

  private async uniqueUsername(username: string) {
    const byUsername = await this.usersRepository.findOneByUsername(username);

    if (byUsername) {
      throw new ConflictException('Username already in use');
    }
  }

  async findOneByUsername(username: string): Promise<UserEntity | null> {
    return await this.usersRepository.findOneByUsername(username);
  }

  async findOneByEmail(email: string): Promise<UserEntity | null> {
    return await this.usersRepository.findOneByEmail(email);
  }

  async findOneByUserId(userId: string): Promise<UserEntity | null> {
    return await this.usersRepository.findOneById(userId);
  }

  async create(command: CreateUserCommand): Promise<UserEntity> {
    const { email, username } = command;

    await this.uniqueEmail(email);
    await this.uniqueUsername(username);

    return await this.usersRepository.create(command);
  }

  async getProfile(userId: string): Promise<UserResponse> {
    const user: UserEntity | null = await this.findOneByUserId(userId);

    if (!user) {
      throw new UnauthorizedException({
        message: 'User not found',
      });
    }

    return UserResponseMapper.toResponse(user);
  }

  async searchByUsernamePrefix(
    usernamePrefix: string,
  ): Promise<UserResponse[]> {
    const normalizedPrefix = usernamePrefix.trim();

    if (!normalizedPrefix) {
      return [];
    }

    const users =
      await this.usersRepository.findByUsernamePrefix(normalizedPrefix);

    return users.map((user) => UserResponseMapper.toResponse(user));
  }
}
