import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class Profile {
  @Prop({ type: String, default: null })
  displayName: string | null;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
