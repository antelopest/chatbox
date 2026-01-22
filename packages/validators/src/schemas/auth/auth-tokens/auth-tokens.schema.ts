import * as z from 'zod';

import { AccessTokenSchema, RefreshTokenSchema } from '../../../constraints';

export const AuthTokensSchema = z
  .object({
    accessToken: AccessTokenSchema,
    refreshToken: RefreshTokenSchema,
  })
  .strict();
