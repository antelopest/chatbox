import * as z from 'zod';
import { AuthResponseSchema } from '@packages/validators';

export type AuthResponse = z.infer<typeof AuthResponseSchema>;
