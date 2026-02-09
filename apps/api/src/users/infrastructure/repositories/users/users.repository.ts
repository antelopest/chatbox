import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, type UserDocument } from '@users/infrastructure/schemas';
import { MongoConnection } from '@infrastructure/mongo';
import { type CreateUserCommand } from '@users/application/commands';
import { type UserEntity } from '@users/domain/entities';
import { UserPersistenceMapper } from '@users/infrastructure/mappers';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User.name, MongoConnection.MAIN)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async findOneByEmail(email: string): Promise<UserEntity | null> {
    const doc = await this.userModel.findOne({ email }).exec();
    return doc ? UserPersistenceMapper.toEntity(doc) : null;
  }

  async findOneByUsername(username: string): Promise<UserEntity | null> {
    const doc = await this.userModel.findOne({ username }).exec();
    return doc ? UserPersistenceMapper.toEntity(doc) : null;
  }

  async findOneById(id: string): Promise<UserEntity | null> {
    const doc = await this.userModel.findById(id);
    return doc ? UserPersistenceMapper.toEntity(doc) : null;
  }

  async create(command: CreateUserCommand): Promise<UserEntity> {
    const doc = await this.userModel.create(command);
    return UserPersistenceMapper.toEntity(doc);
  }

  private escapeRegex(value: string): string {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  async findByUsernamePrefix(
    usernamePrefix: string,
    limit = 10,
  ): Promise<UserEntity[]> {
    const escaped = this.escapeRegex(usernamePrefix);
    const regex = new RegExp(`^${escaped}`, 'i');

    const docs = await this.userModel
      .find({ username: regex })
      .sort({ username: 1 })
      .limit(limit)
      .exec();

    return docs.map((doc: UserDocument) => UserPersistenceMapper.toEntity(doc));
  }
}
