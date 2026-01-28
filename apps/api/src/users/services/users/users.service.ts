import { ConflictException, Injectable } from '@nestjs/common';

import { type UserEntity } from '@users/entities';
import { UsersRepository } from '@users/repositories';
import { type CreateUserCommand } from '@users/commands';

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
}
