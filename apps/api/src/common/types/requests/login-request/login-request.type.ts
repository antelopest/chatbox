import type { Request } from 'express';
import { UserEntity } from '@users/entities';

export type LoginRequest = Request & { user: UserEntity };
