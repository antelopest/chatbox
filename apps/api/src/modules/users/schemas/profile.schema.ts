import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class Profile {
  @Prop({ required: true })
  displayName: string;

  @Prop()
  avatarUrl?: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
