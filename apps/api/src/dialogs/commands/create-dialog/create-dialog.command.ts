import { DialogType } from '@packages/types';
import { Types } from 'mongoose';

export interface CreateDialogCommand {
  participantIds: Types.ObjectId[];
  type: DialogType;
  title?: string;
}
