import * as z from 'zod';
import { SendMessageSchema } from '@packages/validators';

export type SendMessage = z.infer<typeof SendMessageSchema>;
