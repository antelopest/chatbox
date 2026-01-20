import * as z from 'zod';
import { UserProfileResponseSchema } from '@packages/validators';

export type UserProfileResponse = z.infer<typeof UserProfileResponseSchema>;
