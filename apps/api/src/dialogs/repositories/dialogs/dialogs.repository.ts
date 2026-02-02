import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Dialog, DialogDocument } from '@dialogs/schemas';
import { MongoConnection } from '@infrastructure/mongo';

@Injectable()
export class DialogsRepository {
  constructor(
    @InjectModel(Dialog.name, MongoConnection.MAIN)
    private readonly dialogModel: Model<DialogDocument>,
  ) {}

  findByUser(userId: string) {
    const userObjectId = new Types.ObjectId(userId);
    return this.dialogModel
      .find({ participants: userObjectId })
      .sort({ updatedAt: -1 })
      .lean();
  }

  findPrivateBetween(userA: string, userB: string) {
    const userAId = new Types.ObjectId(userA);
    const userBId = new Types.ObjectId(userB);
    return this.dialogModel.findOne({
      type: 'private',
      participants: { $all: [userAId, userBId] },
    });
  }

  createPrivate(userA: string, userB: string) {
    const userAId = new Types.ObjectId(userA);
    const userBId = new Types.ObjectId(userB);
    return this.dialogModel.create({
      type: 'private',
      participants: [userAId, userBId],
    });
  }

  findById(dialogId: string) {
    return this.dialogModel.findById(dialogId);
  }
}
