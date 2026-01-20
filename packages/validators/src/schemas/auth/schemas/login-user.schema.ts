import * as z from 'zod';

import { EmailSchema, PasswordSchema } from '../../../constraints';

export const LoginSchema = z
  .object({
    email: EmailSchema,
    password: PasswordSchema,
  })
  .strict();
