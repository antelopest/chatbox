import { DialogType } from '@packages/types';

export interface DialogEntity {
  id: string;
  type: DialogType;
  title: string;
  participantIds: string[];
  updatedAt: Date;
}
