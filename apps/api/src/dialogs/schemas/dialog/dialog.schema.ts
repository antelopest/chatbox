import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DialogType } from '@packages/types';
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
    enum: Object.values(DialogType),
    required: true,
    default: DialogType.PRIVATE,
  })
  type: DialogType;

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
