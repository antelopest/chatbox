import { LoginSchema } from './schemas/login.schema';
import { RegisterSchema } from './schemas/register.schema';

export const AuthSchema = {
  Login: LoginSchema,
  Register: RegisterSchema,
} as const;