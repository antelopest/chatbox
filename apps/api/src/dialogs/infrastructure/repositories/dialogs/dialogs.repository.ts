import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Dialog, DialogDocument } from '@dialogs/infrastructure/schemas';
import { MongoConnection } from '@infrastructure/mongo';
import { CreateDialogCommand } from '@dialogs/application/commands';
import { PrivateDialog } from '@dialogs/read-models';
import { DialogEntity } from '@dialogs/domain';
import { DialogPersistenceMapper } from '@dialogs/infrastructure';
import { DialogType } from '@packages/types';

@Injectable()
export class DialogsRepository {
  constructor(
    @InjectModel(Dialog.name, MongoConnection.MAIN)
    private readonly dialogModel: Model<DialogDocument>,
  ) {}

  async createPrivateDialog(
    createDialogCommand: CreateDialogCommand,
  ): Promise<DialogEntity> {
    const doc = await this.dialogModel.create(createDialogCommand);
    return DialogPersistenceMapper.toEntity(doc);
  }

  async findExistPrivateDialog(
    participantIdA: Types.ObjectId,
    participantIdB: Types.ObjectId,
  ): Promise<DialogEntity | null> {
    const doc = await this.dialogModel.findOne({
      type: DialogType.PRIVATE,
      participants: { $all: [participantIdA, participantIdB] },
    });

    return doc ? DialogPersistenceMapper.toEntity(doc) : null;
  }

  findByParticipantId(userObjectId: Types.ObjectId): Promise<PrivateDialog[]> {
    return this.dialogModel
      .aggregate<PrivateDialog>([
        {
          $match: {
            type: DialogType.PRIVATE,
            participants: userObjectId,
          },
        },
        {
          $addFields: {
            otherParticipantId: {
              $first: {
                $filter: {
                  input: '$participants',
                  cond: { $ne: ['$$this', userObjectId] },
                },
              },
            },
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'otherParticipantId',
            foreignField: '_id',
            as: 'participant',
          },
        },
        {
          $lookup: {
            from: 'messages',
            let: { messageId: '$lastMessageId' },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ['$_id', '$$messageId'] },
                },
              },
              {
                $project: {
                  _id: 1,
                  text: 1,
                  createdAt: 1,
                },
              },
            ],
            as: 'lastMessage',
          },
        },
        { $sort: { updatedAt: -1 } },
        {
          $project: {
            _id: 0,
            id: { $toString: '$_id' },
            type: 1,

            participant: {
              $let: {
                vars: {
                  user: { $arrayElemAt: ['$participant', 0] },
                },
                in: {
                  id: { $toString: '$$user._id' },
                  username: '$$user.username',
                },
              },
            },

            lastMessage: {
              $cond: [
                { $gt: [{ $size: '$lastMessage' }, 0] },
                {
                  $let: {
                    vars: { msg: { $arrayElemAt: ['$lastMessage', 0] } },
                    in: {
                      id: { $toString: '$$msg._id' },
                      text: '$$msg.text',
                      createdAt: '$$msg.createdAt',
                    },
                  },
                },
                null,
              ],
            },
          },
        },
      ])
      .exec();
  }
}
