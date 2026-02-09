import { CreateDialogCommand } from '@dialogs/application/commands';
import { DialogListItem } from '@dialogs/read-models';
import { DialogsRepository } from '@dialogs/infrastructure/repositories';
import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class DialogsService {
  constructor(private readonly dialogsRepository: DialogsRepository) {}

  create(createDialogCommand: CreateDialogCommand) {
    return this.dialogsRepository.create(createDialogCommand);
  }

  findDialogs(userObjectId: Types.ObjectId): Promise<DialogListItem[]> {
    return this.dialogsRepository.findByParticipant(userObjectId);
  }
}
