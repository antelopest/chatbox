import * as z from 'zod';

export const UserProfileResponseSchema = z
  .object({
    displayName: z.string().nullable(),
  })
  .strict();
