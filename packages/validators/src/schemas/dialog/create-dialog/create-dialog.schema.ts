import * as z from 'zod';
import { DialogType } from '@packages/types';

const dialogTypes = Object.values(DialogType) as [DialogType, ...DialogType[]];

export const CreateDialogSchema = z.object({
  participantIds: z.array(z.string()).min(1),
  type: z.enum(dialogTypes),
  title: z.string().min(1).optional(),
});
