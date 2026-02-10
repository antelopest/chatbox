import { DialogType } from '@packages/types';

export interface Participant {
  id: string;
  username: string;
}

export interface LastMessage {
  id: string;
  text: string;
  createdAt: string;
}

export interface PrivateDialog {
  id: string;
  type: DialogType;
  participant: Participant;
  lastMessage: LastMessage;
}
