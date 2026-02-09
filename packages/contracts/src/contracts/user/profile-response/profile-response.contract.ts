import * as z from 'zod';
import { ProfileResponseSchema } from '@packages/validators';

export type UserProfileResponse = z.infer<typeof ProfileResponseSchema>;
