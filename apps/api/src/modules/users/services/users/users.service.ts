import { ConflictException, Injectable } from '@nestjs/common';

import { UserResponse } from '@packages/contracts';

import { UserMapper } from '@users/mapper/user.mapper';
import { UserEntity } from '@users/entities';
import { UsersRepository } from '@users/repositories';
import { CreateUserCommand } from '@users/commands';

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

  async findOneByEmail(email: string): Promise<UserEntity | null> {
    return await this.usersRepository.findOneByEmail(email);
  }

  async create(command: CreateUserCommand): Promise<UserResponse> {
    const { email } = command;

    await this.uniqueEmail(email);

    const user = await this.usersRepository.create(command);

    return UserMapper.toResponse(user);
  }
}
