import { DialogType } from '@packages/types';

export interface DialogParticipantPreview {
  id: string;
  username: string;
  displayName: string | null;
}

export interface DialogListItem {
  id: string;
  type: DialogType;
  title: string | null;
  participantIds: string[];
  participants: DialogParticipantPreview[];
  updatedAt: Date;
}
