import * as z from 'zod';
import { DialogType } from '@packages/types';

const dialogTypes = Object.values(DialogType) as [DialogType, ...DialogType[]];

export const DialogResponseSchema = z.object({
  id: z.string(),
  type: z.enum(dialogTypes),
  title: z.string().nullable(),
  participantIds: z.array(z.string()),
  updatedAt: z.string(),
});

export const DialogsResponseSchema = z.array(DialogResponseSchema);
