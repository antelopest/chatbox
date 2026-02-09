import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Dialog, DialogDocument } from '@dialogs/infrastructure/schemas';
import { MongoConnection } from '@infrastructure/mongo';
import { CreateDialogCommand } from '@dialogs/application/commands';
import { DialogListItem } from '@dialogs/read-models';
import { DialogEntity } from '@dialogs/domain';
import { DialogPersistenceMapper } from '@dialogs/infrastructure';
import { DialogType } from '@packages/types';

@Injectable()
export class DialogsRepository {
  constructor(
    @InjectModel(Dialog.name, MongoConnection.MAIN)
    private readonly dialogModel: Model<DialogDocument>,
  ) {}

  async create(
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

  findByParticipantId(userObjectId: Types.ObjectId): Promise<DialogListItem[]> {
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
}
