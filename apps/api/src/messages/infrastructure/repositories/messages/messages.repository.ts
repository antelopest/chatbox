import { MongoConnection } from '@infrastructure/mongo';
import { Message, MessageDocument } from '@messages/infrastructure';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class MessageRepository {
  constructor(
    @InjectModel(Message.name, MongoConnection.MAIN)
    private readonly messageModel: Model<MessageDocument>,
  ) {}

  async create() {}

  async findByDialogId() {}
}
