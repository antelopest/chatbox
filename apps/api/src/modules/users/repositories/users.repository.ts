import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from '@users/schemas/user.schema';
import { MongoConnection } from '@infrastructure/mongo';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User.name, MongoConnection.MAIN)
    private readonly userModel: Model<UserDocument>,
  ) {}

  findByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  findByUsername(username: string) {
    return this.userModel.findOne({ username }).exec();
  }

  create(user: Omit<User, 'id'>) {
    return this.userModel.create(user);
  }
}
