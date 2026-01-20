import * as z from 'zod';

import { EmailSchema, PasswordSchema } from '../../../constraints';
import { passwordsMatchRule } from '../../../rules';

export const RegisterUserSchema = z
  .object({
    email: EmailSchema,
    password: PasswordSchema,
    confirmPassword: PasswordSchema,
  })
  .strict()
  .refine(passwordsMatchRule, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });
