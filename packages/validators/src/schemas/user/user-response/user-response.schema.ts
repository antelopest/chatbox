import * as z from 'zod';

import { ProfileResponseSchema } from '../profile-response/profile-response.schema';
import { EmailSchema } from '../../../constraints';

export const UserResponseSchema = z.object({
  id: z.string(),
  email: EmailSchema,
  profile: ProfileResponseSchema,
  username: z.string().nullable(),
  createdAt: z.date(),
});
