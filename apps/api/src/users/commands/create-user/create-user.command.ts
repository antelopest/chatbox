export interface CreateUserCommand {
  email: string;
  username: string;
  passwordHash: string;
}
