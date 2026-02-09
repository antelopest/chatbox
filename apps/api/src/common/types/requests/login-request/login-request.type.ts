import type { Request } from 'express';
import { UserEntity } from '@users/domain/entities';

export type LoginRequest = Request & { user: UserEntity };
