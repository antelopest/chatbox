import * as z from 'zod';

import { AuthTokensSchema } from '../auth-tokens/auth-tokens.schema';
import { UserResponseSchema } from '../../user';

export const AuthResponseSchema = z
  .object({
    tokens: AuthTokensSchema,
    user: UserResponseSchema,
  })
  .strict();
