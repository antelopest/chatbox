import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Dialog, DialogDocument } from '@dialogs/infrastructure/schemas';
import { MongoConnection } from '@infrastructure/mongo';
import { CreateDialogCommand } from '@dialogs/application/commands';
import { DialogListItem } from '@dialogs/read-models';

@Injectable()
export class DialogsRepository {
  constructor(
    @InjectModel(Dialog.name, MongoConnection.MAIN)
    private readonly dialogModel: Model<DialogDocument>,
  ) {}

  create(createDialogCommand: CreateDialogCommand) {
    return this.dialogModel.create({
      participants: createDialogCommand.participantIds,
      type: createDialogCommand.type,
      title: createDialogCommand.title ?? null,
    });
  }

  findByParticipant(userObjectId: Types.ObjectId): Promise<DialogListItem[]> {
    return this.dialogModel
      .aggregate<DialogListItem>([
        { $match: { participants: userObjectId } },
        {
          $lookup: {
            from: 'users',
            localField: 'participants',
            foreignField: '_id',
            as: 'participantUsers',
          },
        },
        {
          $project: {
            _id: 0,
            id: { $toString: '$_id' },
            type: 1,
            title: { $ifNull: ['$title', null] },
            updatedAt: 1,
            participantIds: {
              $map: {
                input: '$participants',
                as: 'participantId',
                in: { $toString: '$$participantId' },
              },
            },
            participants: {
              $map: {
                input: '$participantUsers',
                as: 'participant',
                in: {
                  id: { $toString: '$$participant._id' },
                  username: '$$participant.username',
                  displayName: '$$participant.profile.displayName',
                },
              },
            },
          },
        },
        { $sort: { updatedAt: -1 } },
      ])
      .exec();
  }

  // findByUser(userId: string) {
  //   const userObjectId = new Types.ObjectId(userId);
  //   return this.dialogModel
  //     .find({ participants: userObjectId })
  //     .sort({ updatedAt: -1 })
  //     .lean();
  // }

  // findPrivateBetween(userA: string, userB: string) {
  //   const userAId = new Types.ObjectId(userA);
  //   const userBId = new Types.ObjectId(userB);
  //   return this.dialogModel.findOne({
  //     type: 'private',
  //     participants: { $all: [userAId, userBId] },
  //   });
  // }

  // createPrivate(userA: string, userB: string) {
  //   const userAId = new Types.ObjectId(userA);
  //   const userBId = new Types.ObjectId(userB);
  //   return this.dialogModel.create({
  //     type: 'private',
  //     participants: [userAId, userBId],
  //   });
  // }

  // findById(dialogId: string) {
  //   return this.dialogModel.findById(dialogId);
  // }
}
