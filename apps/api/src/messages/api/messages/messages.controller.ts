import { AccessJwtStrategy } from '@auth/security/strategies';
import { ZodValidationPipe } from '@common/pipes';
import { AccessPayloadRequest } from '@common/types';
import { MessagesService } from '@messages/application/services/messages/messages.service';
import { Controller, Post, Req, UseGuards, UsePipes } from '@nestjs/common';
import { SendMessageSchema } from '@packages/validators';

@Controller('messages')
@UseGuards(AccessJwtStrategy)
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  // @Post()
  // @UsePipes(new ZodValidationPipe(SendMessageSchema))
  // async sendMessage(
  //   @Req() accessPayloadRequest: AccessPayloadRequest,
  //   @Body() sendMessage: SendMessage,
  // ) {}
}
