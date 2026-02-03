import * as z from 'zod';
import {
  DialogResponseSchema,
  DialogsResponseSchema,
} from '@packages/validators';

export type DialogResponse = z.infer<typeof DialogResponseSchema>;

export type DialogsResponse = z.infer<typeof DialogsResponseSchema>;
