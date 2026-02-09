import { CreateDialogCommand } from '@dialogs/application/commands';
import { DialogListItem } from '@dialogs/read-models';
import { DialogsRepository } from '@dialogs/infrastructure/repositories';
import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class DialogsService {
  constructor(private readonly dialogsRepository: DialogsRepository) {}

  async ensurePrivateDialogNotExists(
    participantIdA: Types.ObjectId,
    participantIdB: Types.ObjectId,
  ) {
    const dialogExist = await this.dialogsRepository.findExistPrivateDialog(
      participantIdA,
      participantIdB,
    );
    if (dialogExist) {
      // TODO 409 DialogAlreadyExists
      throw new ConflictException('Dialog already exists');
    }
  }

  async createPrivateDialog(createDialogCommand: CreateDialogCommand) {
    if (createDialogCommand.participants.length !== 2) {
      throw new BadRequestException(
        'Private dialog requires exactly 2 participants',
      );
    }

    const [participantIdA, participantIdB] = createDialogCommand.participants;
    await this.ensurePrivateDialogNotExists(participantIdA, participantIdB);

    console.log(createDialogCommand);
    return this.dialogsRepository.createPrivateDialog(createDialogCommand);
  }

  findPrivateDialogs(userObjectId: Types.ObjectId): Promise<DialogListItem[]> {
    return this.dialogsRepository.findByParticipantId(userObjectId);
  }
}
