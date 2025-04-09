import { ApiConfigService } from './../../../../shared/services/api-config.service';
import {
  Injectable,
  Logger,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { SignInDto } from '../../web/views/signin-user.dto';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenIdsStorage } from '../../infrastructure/strategy/refresh-token-ids-storage';
import AuthResponsePresenter from '../../web/views/auth-response.presenter';
import RefreshTokenResponsePresenter from '../../web/views/refresh-token-response.presenter';
import * as crypto from 'crypto';
import { UserService } from '../../../users/core/services/user.service';
import { User } from '../../../users/core/common/schemas/user.schema';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly refreshTokenIdsStorage: RefreshTokenIdsStorage,
    private readonly configService: ApiConfigService
  ) {}

  async signIn(signInDto: SignInDto): Promise<AuthResponsePresenter> {
    const { email, password } = signInDto;
    const user = await this.validateUser(email, password);
    console.log(user);
    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }
    const payload = {
      sub: user.id,
      email: user.email,
    };
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.jwtConfig.signOptions.expiresIn,
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.refreshTokenConfig.refreshTokenExpiresIn,
    });
    await this.refreshTokenIdsStorage.insert(user.id, refreshToken);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    } as AuthResponsePresenter;
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findOneByEmail(email, true);
    console.log('userEmail', user);
    if (user && user.password && (await user.validatePassword(password))) {
      return user;
    }
    return null;
  }

  async validateAndReturnAccessToken(token: string) {
    try {
      const decoded = await this.jwtService.verifyAsync(token, {
        ignoreExpiration: false,
      });
      return decoded;
    } catch (error) {
      this.logger.error(`Error: ${error.message}`);
      throw new UnauthorizedException('Invalid access token');
    }
  }

  async refreshAccessToken(
    refreshToken: string
  ): Promise<RefreshTokenResponsePresenter> {
    try {
      const decoded = await this.jwtService.verifyAsync(refreshToken);
      await this.refreshTokenIdsStorage.validate(decoded.sub, refreshToken);
      const payload = {
        sub: decoded.sub,
        email: decoded.email,
        clubUserId: decoded.clubUserId,
        clubId: decoded.clubId,
      };
      const accessToken = await this.jwtService.signAsync(payload, {
        expiresIn: this.configService.jwtConfig.signOptions.expiresIn,
      });
      return new RefreshTokenResponsePresenter(accessToken);
    } catch (error) {
      this.logger.error(`Error: ${error.message}`);
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async invalidateToken(accessToken: string): Promise<void> {
    try {
      const decoded = await this.jwtService.verifyAsync(accessToken);
      await this.refreshTokenIdsStorage.invalidate(decoded.sub);
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async generateResetToken(email: string) {
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiration = new Date();
    resetTokenExpiration.setHours(resetTokenExpiration.getHours() + 1);
    const user = await this.userService.saveResetTokenAndReturnUser(email, {
      resetToken,
      resetTokenExpiration,
    });
    return {
      email: user.email,
      firstname: user.firstName,
      lastname: user.lastName,
      resetToken,
    };
  }

  async resetPassword(resetToken: string, newPassword: string): Promise<void> {
    await this.userService.resetPassword(resetToken, newPassword);
  }
}
