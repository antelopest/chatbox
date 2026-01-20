import * as z from 'zod';

export type UserProfileResponse = z.infer<typeof UserProfile>