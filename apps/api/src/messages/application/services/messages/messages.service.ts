import { MessagesRepository } from '@messages/infrastructure';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessagesService {
  constructor(private readonly messagesRepository: MessagesRepository) {}
}
