import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { InfrastructureModule } from '@infrastructure/infrastructure.module';
import { MongoConnection } from '@infrastructure/mongo';
import { User, UserSchema } from '@users/schemas/user.schema';
import { UsersService } from '@users/services';
import { UsersRepository } from '@users/repositories';
import { UsersController } from '@users/controllers';

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
