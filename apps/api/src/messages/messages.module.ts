import { Module } from '@nestjs/common';
import { MessagesController } from './api/messages/messages.controller';

@Module({
  controllers: [MessagesController],
})
export class MessagesModule {}
