import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { InfrastructureModule } from '@infrastructure/infrastructure.module';
import { MONGO_NAME_CONNECTION } from '@infrastructure/mongo';
import { User, UserSchema } from '@users/schemas';

@Module({
  imports: [
    InfrastructureModule,
    MongooseModule.forFeature(
      [{ name: User.name, schema: UserSchema }],
      MONGO_NAME_CONNECTION,
    ),
  ],
})
export class UsersModule {}
