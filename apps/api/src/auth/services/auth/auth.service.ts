import { UsersService } from '@users/application/services';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { PasswordService, UsernameService } from '@auth/services';

import type {
  AuthResponse,
  AuthTokens,
  RegisterUser,
} from '@packages/contracts';

import type { ConfigType } from '@nestjs/config';

import { type CreateUserCommand } from '@users/application/commands';
import { ErrorCode } from '@common/errors';
import { type UserEntity } from '@users/domain/entities';
import { authConfig } from '@config/configuration';
import {
  type AccessJwtPayload,
  type RefreshJwtPayload,
} from 'src/auth/security/types';
import { randomUUID } from 'crypto';
import { RefreshTokenStorage } from '@auth/security/storages';
import { UserResponseMapper } from '@users/application/mappers';

@Injectable()
export class AuthService {
  constructor(
    @Inject(authConfig.KEY)
    private readonly config: ConfigType<typeof authConfig>,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly usernameService: UsernameService,
    private readonly passwordService: PasswordService,
    private readonly refreshTokenStorage: RefreshTokenStorage,
  ) {}

  async register(registerUser: RegisterUser): Promise<AuthResponse> {
    const { email, password } = registerUser;

    const passwordHash = await this.passwordService.hash(password);

    const username = await this.usernameService.generateUniqueUsername(email);

    const createUserCommand: CreateUserCommand = {
      email,
      username,
      passwordHash,
    };

    const userEntity: UserEntity =
      await this.usersService.create(createUserCommand);

    return this.login(userEntity);
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

  private issueAccessToken(user: UserEntity): string {
    const accessPayload: AccessJwtPayload = {
      sub: user.id,
      email: user.email,
      type: 'access',
    };

    const accessToken = this.jwtService.sign(accessPayload, {
      secret: this.config.access.secret,
      expiresIn: this.config.access.ttl,
    });

    return accessToken;
  }

  private async issueRefreshToken(user: UserEntity): Promise<string> {
    const refreshTokenId = randomUUID();

    const refreshPayload: RefreshJwtPayload = {
      sub: user.id,
      jti: refreshTokenId,
      type: 'refresh',
    };

    const refreshToken = this.jwtService.sign(refreshPayload, {
      secret: this.config.refresh.secret,
      expiresIn: this.config.refresh.ttl,
    });

    await this.refreshTokenStorage.save(
      user.id,
      refreshTokenId,
      this.config.refresh.ttlSeconds,
    );

    return refreshToken;
  }

  private async issueTokens(user: UserEntity): Promise<AuthTokens> {
    return {
      accessToken: this.issueAccessToken(user),
      refreshToken: await this.issueRefreshToken(user),
    };
  }

  async login(userEntity: UserEntity): Promise<AuthResponse> {
    const AuthResponse: AuthResponse = {
      tokens: await this.issueTokens(userEntity),
      user: UserResponseMapper.toResponse(userEntity),
    };

    return AuthResponse;
  }

  async refresh(userId: string, refreshTokenId: string): Promise<AuthTokens> {
    await this.refreshTokenStorage.remove(userId, refreshTokenId);

    const user = await this.usersService.findOneByUserId(userId);

    if (!user) {
      throw new UnauthorizedException({
        message: 'User not found',
      });
    }

    return this.issueTokens(user);
  }

  async logout(userId: string, refreshTokenId: string): Promise<void> {
    await this.refreshTokenStorage.remove(userId, refreshTokenId);
  }
}
