import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { type HydratedDocument } from 'mongoose';

import { Profile } from '@users/schemas/profile.schema';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true, lowercase: true })
  email: string;

  @Prop({ required: true, unique: true, lowercase: true })
  username: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ type: Profile, required: true, default: () => ({}) })
  profile: Profile;

  createdAt: Date;
  updatedAt: Date;
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
