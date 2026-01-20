import * as z from 'zod';
import { UserResponseSchema } from '@packages/validators';

export type UserResponse = z.infer<typeof UserResponseSchema>;
