import { DialogType } from '@packages/types';

export class DialogEntity {
  readonly id: string;
  readonly type: DialogType;
  readonly title: string | null;
  readonly participants: string[];
  readonly updatedAt: Date;

  constructor(params: {
    id: string;
    type: DialogType;
    title: string | null;
    participants: string[];
    updatedAt: Date;
  }) {
    Object.assign(this, params);
  }
}
