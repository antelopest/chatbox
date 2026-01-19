import * as z from 'zod';

import { emailSchema, passwordSchema } from '../primitives';

export const LoginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type LoginDto = z.infer<typeof LoginSchema>;
