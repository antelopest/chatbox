import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { InfrastructureModule } from '@infrastructure/infrastructure.module';
import { MongoConnection } from '@infrastructure/mongo';

import { DialogsController } from '@dialogs/api';
import { Dialog, DialogSchema } from '@dialogs/infrastructure/schemas';
import { DialogsService } from '@dialogs/application/services';
import { DialogsRepository } from '@dialogs/infrastructure/repositories';

@Module({
  controllers: [DialogsController],
  imports: [
    InfrastructureModule,
    MongooseModule.forFeature(
      [{ name: Dialog.name, schema: DialogSchema }],
      MongoConnection.MAIN,
    ),
  ],
  providers: [DialogsService, DialogsRepository],
  exports: [DialogsService, DialogsRepository],
})
export class DialogsModule {}
