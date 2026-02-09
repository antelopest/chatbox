import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './infrastructure/schemas';
import { MessagesController } from '@messages/api/messages/messages.controller';
import { InfrastructureModule } from '@infrastructure/infrastructure.module';
import { MongoConnection } from '@infrastructure/mongo';

@Module({
  imports: [
    InfrastructureModule,
    MongooseModule.forFeature(
      [{ name: Message.name, schema: MessageSchema }],
      MongoConnection.MAIN,
    ),
  ],
  controllers: [MessagesController],
})
export class MessagesModule {}
