import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { type HydratedDocument, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Dialog {
  @Prop({
    type: [Types.ObjectId],
    ref: 'User',
    index: true,
  })
  participants: Types.ObjectId[];

  @Prop({
    enum: ['private', 'group'],
    default: 'private',
  })
  type: 'private' | 'group';

  @Prop({
    type: Types.ObjectId,
    ref: 'Message',
    default: null,
  })
  lastMessageId: Types.ObjectId | null;

  createdAt: Date;
  updatedAt: Date;
}

export type DialogDocument = HydratedDocument<Dialog>;
export const DialogSchema = SchemaFactory.createForClass(Dialog);

DialogSchema.index({ participants: 1 });
