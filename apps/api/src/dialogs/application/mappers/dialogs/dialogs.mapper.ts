import { DialogsResponseSchema } from '@packages/validators';
import { DialogMapper } from '../dialog/dialog.mapper';
import { DialogsResponse } from '@packages/contracts';
import { DialogEntity } from '@dialogs/domain/entities';

export class DialogsMapper {
  static toResponse(entities: DialogEntity[]): DialogsResponse {
    const dialogsRespone: DialogsResponse = entities.map(
      (entity: DialogEntity) => DialogMapper.toResponse(entity),
    );

    const parsed: DialogsResponse = DialogsResponseSchema.parse(dialogsRespone);

    return parsed;
  }
}
