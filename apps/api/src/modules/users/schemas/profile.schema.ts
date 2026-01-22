import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class Profile {
  @Prop({ default: null })
  displayName: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
