import { DialogsRepository } from '@dialogs/infrastructure/repositories/dialogs/dialogs.repository';
import { Injectable } from '@nestjs/common';
import { PrivateDialogsResponse } from '@packages/contracts';
import { Types } from 'mongoose';
import { PrivateDialog } from '@dialogs/read-models/models/private-dialogs/private-dialogs.read-model';
import { PrivateDialogsMapper } from '@dialogs/read-models/mappers/private-dialogs/private-dialogs.mapper';

@Injectable()
export class DialogsReadService {
  constructor(private readonly dialogsRepository: DialogsRepository) {}

  async findPrivateDialogsByUserId(
    userObjectId: Types.ObjectId,
  ): Promise<PrivateDialogsResponse> {
    const privateDialogs: PrivateDialog[] =
      await this.dialogsRepository.findByParticipantId(userObjectId);

    return PrivateDialogsMapper.toResponse(privateDialogs);
  }
}
