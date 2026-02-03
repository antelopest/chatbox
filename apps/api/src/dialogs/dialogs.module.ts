import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { InfrastructureModule } from '@infrastructure/infrastructure.module';
import { MongoConnection } from '@infrastructure/mongo';

import { DialogsController } from '@dialogs/controllers';
import { Dialog, DialogSchema } from '@dialogs/schemas';
import { DialogsService } from '@dialogs/services';
import { DialogsRepository } from '@dialogs/repositories';

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
