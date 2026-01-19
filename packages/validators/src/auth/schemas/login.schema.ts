import * as z from 'zod';

import { emailSchema, passwordSchema } from '../primitives';

export const LoginSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
  })
  .strict();

export type LoginInput = z.infer<typeof LoginSchema>;
