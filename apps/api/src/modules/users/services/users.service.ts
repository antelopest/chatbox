import { MONGO_NAME_CONNECTION } from '@infrastructure/mongo';
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '@users/schemas';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name, MONGO_NAME_CONNECTION)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async create(
    email: string,
    username: string,
    displayName: string,
    passwordHash: string,
  ): Promise<UserDocument | null> {
    const exits = await this.findByEmail(email);

    if (exits) {
      throw new ConflictException('User already exists');
    }

    return this.userModel.create({
      email,
      passwordHash,
      username,
      profile: {
        displayName,
      },
    });
  }
}
