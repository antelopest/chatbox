import { DialogEntity } from '@dialogs/entities';
import { type DialogResponse } from '@packages/contracts';
import { DialogResponseSchema } from '@packages/validators';

export class DialogMapper {
  static toResponse(dialogEntity: DialogEntity): DialogResponse {
    const parsed: DialogResponse = DialogResponseSchema.parse({
      id: dialogEntity.id,
      type: dialogEntity.type,
      title: dialogEntity.title,
      participantIds: dialogEntity.participantIds,
      updatedAt: dialogEntity.updatedAt.toISOString(),
    });

    return parsed;
  }
}
