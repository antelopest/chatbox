import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export enum ChangelogType {
  Feature = 'feature',
  Fix = 'fix',
  Improvement = 'improvement',
  Breaking = 'breaking',
}

@Schema({ collection: 'changelogs', timestamps: true })
export class Changelog {
  @Prop({ required: true, match: /^\d+\.\d+\.\d+$/ })
  version: string;

  @Prop({ required: true, enum: ChangelogType })
  type: ChangelogType;

  @Prop({ required: true })
  title: string;

  @Prop({ type: String })
  description?: string;

  @Prop({ type: String })
  author?: string;

  @Prop({ default: true })
  isPublic: boolean;

  @Prop({ type: Date, required: true, default: () => new Date() })
  releaseDate: Date;
}
export type ChangelogDocument = HydratedDocument<Changelog>;

export const ChangelogSchema = SchemaFactory.createForClass(Changelog);

ChangelogSchema.index({ releaseDate: -1 });
ChangelogSchema.index({ version: -1 });
ChangelogSchema.index({ isPublic: 1, releaseDate: -1 });
