import { CreateDialogCommand } from '@dialogs/commands';
import { DialogsRepository } from '@dialogs/repositories';
import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class DialogsService {
  constructor(private readonly dialogsRepository: DialogsRepository) {}

  create(createDialogCommand: CreateDialogCommand) {
    return this.dialogsRepository.create(createDialogCommand);
  }

  findDialogs(userObjectId: Types.ObjectId) {
    return this.dialogsRepository.findByParticipant(userObjectId);
  }
}
