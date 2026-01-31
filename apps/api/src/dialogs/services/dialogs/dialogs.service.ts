import { DialogsRepository } from '@dialogs/repositories';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DialogsService {
  constructor(private readonly DialogsRepository: DialogsRepository) {}
}
