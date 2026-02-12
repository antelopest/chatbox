import { PrivateDialogsResponseSchema } from '@packages/validators';
import { PrivateDialogsResponse } from '@packages/contracts';
import { PrivateDialog } from '@dialogs/read-models/models';

export class PrivateDialogsMapper {
  static toResponse(dialogs: PrivateDialog[]): PrivateDialogsResponse {
    console.log(dialogs);
    const parsed: PrivateDialogsResponse =
      PrivateDialogsResponseSchema.parse(dialogs);

    return parsed;
  }
}
