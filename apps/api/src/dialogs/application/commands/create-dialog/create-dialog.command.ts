import { DialogType } from '@packages/types';
import { Types } from 'mongoose';

export interface CreateDialogCommand {
  participants: Types.ObjectId[];
  type: DialogType;
  title?: string;
}
