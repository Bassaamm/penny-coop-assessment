import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { UserService } from '../../../users/services/user.service';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ApiConfigService } from '../../../../shared/api-config.service';
import { User } from '../../../users/common/schemas/user.schema';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token'
) {
  private readonly logger = new Logger(JwtRefreshTokenStrategy.name);

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    readonly configService: ApiConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.jwtConfig.secret,
    });
    this.logger.warn('JwtRefreshTokenStrategy initialized');
  }
  async validate(payload: any) {
    this.logger.warn(`Payload: ${JSON.stringify(payload)}`);
    const user: User = await this.userService.findOne(payload.sub);
    if (!user) {
      this.logger.error('User not found');
      throw new UnauthorizedException();
    }
    return user;
  }
}
