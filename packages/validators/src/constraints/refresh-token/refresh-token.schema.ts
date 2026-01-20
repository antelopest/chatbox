import * as z from 'zod';

export const RefreshTokenSchema = z.string().min(1);
