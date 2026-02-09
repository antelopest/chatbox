import * as z from 'zod';
import { SearchUsersQuerySchema } from '@packages/validators';

export type SearchUsersQuery = z.infer<typeof SearchUsersQuerySchema>;
