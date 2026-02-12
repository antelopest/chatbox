import * as z from 'zod';
import { DialogType } from '@packages/types';

const dialogTypes = Object.values(DialogType) as [DialogType, ...DialogType[]];

export const ParticipantSchema = z.object({
  id: z.string().min(1),
  username: z.string().min(1),
});

export const LastMessageSchema = z.object({
  id: z.string().min(1),
  text: z.string(),
  createdAt: z.coerce.date().nullable(),
});

export const PrivateDialogResponseSchema = z.object({
  id: z.string(),
  type: z.enum(dialogTypes),
  participant: ParticipantSchema,
  lastMessage: LastMessageSchema.nullable(),
});

export const PrivateDialogsResponseSchema = z.array(
  PrivateDialogResponseSchema,
);
