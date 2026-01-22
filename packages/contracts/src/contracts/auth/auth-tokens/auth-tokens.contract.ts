import * as z from 'zod';
import { AuthTokensSchema } from '@packages/validators';

export type AuthTokens = z.infer<typeof AuthTokensSchema>;
