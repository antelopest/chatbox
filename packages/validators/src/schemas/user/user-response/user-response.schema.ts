import * as z from 'zod';

import { UserProfileResponseSchema } from '../user-profile-response/user-profile-response.schema';
import { EmailSchema } from '../../../constraints';

export const UserResponseSchema = z.object({
  id: z.string(),
  email: EmailSchema,
  profile: UserProfileResponseSchema,
  username: z.string(),
  createdAt: z.string(),
});
