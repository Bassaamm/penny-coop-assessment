import { ApiConfigService } from './../../../../shared/services/api-config.service';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserService } from '../../../users/core/services/user.service';
import { User } from '../../../users/core/common/schemas/user.schema';

export class UserPayload {
  user: User;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(
    private readonly userService: UserService,
    readonly configService: ApiConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.jwtConfig.secret,
    });
    this.logger.warn('JwtStrategy initialized');
  }
  async validate(payload: any) {
    const user: User = await this.userService.findOne(payload.sub);
    if (!user) {
      this.logger.error('User not found');
      throw new UnauthorizedException();
    }

    return { user: user } as UserPayload;
  }
}
