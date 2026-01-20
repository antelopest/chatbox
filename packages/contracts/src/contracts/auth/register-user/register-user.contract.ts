import * as z from 'zod';
import { RegisterUserSchema } from '@packages/validators';

export type RegisterUser = z.infer<typeof RegisterUserSchema>;
