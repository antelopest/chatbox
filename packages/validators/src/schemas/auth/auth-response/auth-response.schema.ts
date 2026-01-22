import * as z from 'zod';

import { UserResponseSchema } from '../../user';
import { AuthTokensSchema } from '../auth-tokens/auth-tokens.schema';

export const AuthResponseSchema = z
  .object({
    tokens: AuthTokensSchema,
    user: UserResponseSchema,
  })
  .strict();
