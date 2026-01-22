import { UsersService } from '@users/services';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { PasswordService } from '@auth/services';

import type {
  AuthResponse,
  AuthTokens,
  RegisterUser,
  UserResponse,
} from '@packages/contracts';

import type { ConfigType } from '@nestjs/config';

import { CreateUserCommand } from '@users/commands';
import { ErrorCode } from '@common/errors';
import { UserEntity } from '@users/entities';
import { UserMapper } from '@users/mapper/user.mapper';
import { authConfig } from '@config/configuration';
import { AccessJwtPayload, RefreshJwtPayload } from '@auth/security/types';
import { randomUUID } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(authConfig.KEY)
    private readonly config: ConfigType<typeof authConfig>,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly passwordService: PasswordService,
  ) {}

  async register(registerUser: RegisterUser): Promise<UserResponse> {
    const { email, password } = registerUser;

    const passwordHash = await this.passwordService.hash(password);

    const createUserCommand: CreateUserCommand = {
      email,
      passwordHash,
    };

    const userResponse: UserResponse =
      await this.usersService.create(createUserCommand);

    return userResponse;
  }

  async validateUser(email: string, password: string): Promise<UserEntity> {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException({
        code: ErrorCode.INVALID_CREDENTIALS,
        message: 'Invalid email or password',
      });
    }

    const isValid = await this.passwordService.verify(
      user.passwordHash,
      password,
    );

    if (!isValid) {
      throw new UnauthorizedException({
        code: ErrorCode.INVALID_CREDENTIALS,
        message: 'Invalid email or password',
      });
    }

    return user;
  }

  private issueTokens(user: UserEntity): AuthTokens {
    const accessPayload: AccessJwtPayload = {
      sub: user.id,
      email: user.email,
    };

    const accessToken = this.jwtService.sign(accessPayload, {
      secret: this.config.access.secret,
      expiresIn: this.config.access.ttl,
    });

    const refreshPayload: RefreshJwtPayload = {
      sub: user.id,
      tokenId: randomUUID(),
    };

    const refreshToken = this.jwtService.sign(refreshPayload, {
      secret: this.config.refresh.secret,
      expiresIn: this.config.refresh.ttl,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  login(userEntity: UserEntity): AuthResponse {
    const AuthResponse: AuthResponse = {
      tokens: this.issueTokens(userEntity),
      user: UserMapper.toResponse(userEntity),
    };

    return AuthResponse;
  }
}
