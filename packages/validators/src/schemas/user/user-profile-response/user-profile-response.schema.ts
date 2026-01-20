import * as z from 'zod';

export const UserProfileSchema = z
  .object({
    displayName: z.string(),
    avatarUrl: z.string().nullable(),
  })
  .strict();
