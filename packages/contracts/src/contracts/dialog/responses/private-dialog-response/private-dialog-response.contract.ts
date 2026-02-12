import * as z from 'zod';
import {
  PrivateDialogResponseSchema,
  PrivateDialogsResponseSchema,
} from '@packages/validators';

export type PrivateDialogResponse = z.infer<typeof PrivateDialogResponseSchema>;
export type PrivateDialogsResponse = z.infer<
  typeof PrivateDialogsResponseSchema
>;
