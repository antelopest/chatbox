import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Dialog, DialogDocument } from '@dialogs/schemas';
import { MongoConnection } from '@infrastructure/mongo';

@Injectable()
export class DialogsRepository {
  constructor(
    @InjectModel(Dialog.name, MongoConnection.MAIN)
    private readonly dialogModel: Model<DialogDocument>,
  ) {}

  findByUser(userId: string) {
    return this.dialogModel
      .find({ participants: userId })
      .sort({ updatedAt: -1 })
      .lean();
  }

  findPrivateBetween(userA: string, userB: string) {
    return this.dialogModel.findOne({
      type: 'private',
      participants: { $all: [userA, userB] },
    });
  }

  createPrivate(userA: string, userB: string) {
    return this.dialogModel.create({
      type: 'private',
      participants: [userA, userB],
    });
  }

  findById(dialogId: string) {
    return this.dialogModel.findById(dialogId);
  }
}
