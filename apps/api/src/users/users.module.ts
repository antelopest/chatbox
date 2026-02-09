import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { InfrastructureModule } from '@infrastructure/infrastructure.module';
import { MongoConnection } from '@infrastructure/mongo';

import { User, UserSchema } from '@users/infrastructure/schemas';
import { UsersService } from '@users/application/services';
import { UsersRepository } from '@users/infrastructure/repositories';
import { UsersController } from '@users/api';

@Module({
  controllers: [UsersController],
  imports: [
    InfrastructureModule,
    MongooseModule.forFeature(
      [{ name: User.name, schema: UserSchema }],
      MongoConnection.MAIN,
    ),
  ],
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
})
export class UsersModule {}
