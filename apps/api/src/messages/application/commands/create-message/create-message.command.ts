import { Types } from 'mongoose';

export interface CreateMessageCommand {
  dialogId: Types.ObjectId;
  senderId: Types.ObjectId;
  text: string;
}
