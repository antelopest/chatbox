import * as z from 'zod';

export const AccessTokenSchema = z.string().min(1);
