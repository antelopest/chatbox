import { MongoConnection } from '@infrastructure/mongo';
import { CreateMessageCommand } from '@messages/application/commands';
import { Message, MessageDocument } from '@messages/infrastructure';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class MessageRepository {
  constructor(
    @InjectModel(Message.name, MongoConnection.MAIN)
    private readonly messageModel: Model<MessageDocument>,
  ) {}

  async create(createMessageCommand: CreateMessageCommand) {}

  async findByDialogId(dialogId: Types.ObjectId, limit: number = 50) {
    return this.messageModel
      .find({ dialogId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();
  }
}
