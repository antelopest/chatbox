import { ConflictException, Injectable } from '@nestjs/common';

import { UsersRepository } from '@users/repositories';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(
    email: string,
    username: string,
    displayName: string,
    passwordHash: string,
  ) {
    const emailExists = await this.usersRepository.findByEmail(email);

    if (emailExists) {
      throw new ConflictException(`Email ${email} already exists`);
    }

    const usernameExists = await this.usersRepository.findByUsername(username);

    if (usernameExists) {
      throw new ConflictException(`Username ${username} already exists`);
    }

    return this.usersRepository.create({
      email: email,
      username: username,
      passwordHash,
      profile: {
        displayName,
      },
      isActive: false,
    });
  }
}
