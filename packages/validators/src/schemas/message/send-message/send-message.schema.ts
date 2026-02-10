import * as z from 'zod';

export const SendMessageSchema = z.object({
  dialogId: z.string(),
  text: z.string().min(1).max(4000),
});
