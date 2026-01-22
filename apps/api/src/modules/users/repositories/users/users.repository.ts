import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from '@users/schemas/user.schema';
import { MongoConnection } from '@infrastructure/mongo';
import { CreateUserCommand } from '@users/commands';
import { UserEntity } from '@users/entities';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User.name, MongoConnection.MAIN)
    private readonly userModel: Model<UserDocument>,
  ) {}

  private toEntity(doc: UserDocument): UserEntity {
    return {
      id: doc.id,
      email: doc.email,
      username: doc.username,
      passwordHash: doc.passwordHash,
      profile: {
        displayName: doc.profile.displayName,
      },
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }

  async findOneByEmail(email: string): Promise<UserEntity | null> {
    const doc = await this.userModel.findOne({ email }).exec();
    return doc ? this.toEntity(doc) : null;
  }

  async findOneByUsername(username: string): Promise<UserEntity | null> {
    const doc = await this.userModel.findOne({ username }).exec();
    return doc ? this.toEntity(doc) : null;
  }

  async create(command: CreateUserCommand): Promise<UserEntity> {
    const doc = await this.userModel.create(command);
    return this.toEntity(doc);
  }
}
