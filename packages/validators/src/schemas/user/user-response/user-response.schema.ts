import * as z from 'zod';

import { UserProfileResponseSchema } from '../user-profile-response/user-profile-response.schema';
import { EmailSchema } from '../../../constraints/email/email.schema';

export const UserResponseSchema = z.object({
  id: z.string(),
  email: EmailSchema,
  profile: UserProfileResponseSchema,
  username: z.string().nullable(),
  createdAt: z.date(),
});
