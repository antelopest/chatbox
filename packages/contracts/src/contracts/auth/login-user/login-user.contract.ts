import * as z from 'zod';
import { LoginUserSchema } from '@packages/validators';

export type LoginUser = z.infer<typeof LoginUserSchema>;
