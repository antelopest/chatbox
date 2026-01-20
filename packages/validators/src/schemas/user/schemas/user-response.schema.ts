import * as z from 'zod';

import { UserProfileSchema } from './user-profile-response.schema';
import { EmailSchema } from '../../../constraints';

export const UserResponseSchema = z.object({
  id: z.string(),
  email: EmailSchema,
  profile: UserProfileSchema,
  username: z.string(),
  createdAt: z.string(),
});
