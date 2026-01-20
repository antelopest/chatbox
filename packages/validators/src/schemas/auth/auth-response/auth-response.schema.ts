import * as z from 'zod';

import { AccessTokenSchema, RefreshTokenSchema } from '../../../constraints';
import { UserResponseSchema } from '../../user';

export const AuthResponseSchema = z
  .object({
    accessToken: AccessTokenSchema,
    refreshToken: RefreshTokenSchema,
    user: UserResponseSchema,
  })
  .strict();
