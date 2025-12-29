import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email field is required.' })
    .email({ message: 'Must be a valid email format.' }),
});
