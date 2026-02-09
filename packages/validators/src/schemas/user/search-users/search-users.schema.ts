import * as z from 'zod';

export const SearchUsersQuerySchema = z.object({
  username: z
    .string()
    .min(3)
    .max(32)
    .regex(/^[a-zA-Z0-9_.-]*$/, 'Invalid username')
    .optional()
    .default(''),
});
