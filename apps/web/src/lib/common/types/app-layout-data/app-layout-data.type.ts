import type { UserResponse } from '@packages/contracts';

export interface AppData {
  user?: UserResponse;
  hasToken?: boolean;
}
