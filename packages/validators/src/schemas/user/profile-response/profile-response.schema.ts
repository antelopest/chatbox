import * as z from 'zod';

export const ProfileResponseSchema = z
  .object({
    displayName: z.string().nullable(),
  })
  .strict();
