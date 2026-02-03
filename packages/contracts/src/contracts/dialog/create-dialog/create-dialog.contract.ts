import * as z from 'zod';
import { CreateDialogSchema } from '@packages/validators';

export type CreateDialog = z.infer<typeof CreateDialogSchema>;
