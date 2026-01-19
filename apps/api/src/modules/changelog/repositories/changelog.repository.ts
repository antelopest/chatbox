import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Changelog, ChangelogDocument } from '@changelog/schemas';
import { MongoConnection } from '@infrastructure/mongo';

@Injectable()
export class ChangelogRepository {
  constructor(
    @InjectModel(Changelog.name, MongoConnection.MAIN)
    private readonly model: Model<ChangelogDocument>,
  ) {}

  findAll() {
    return this.model.find({ isPublic: true }).sort({ releaseDate: -1 }).exec();
  }
}
