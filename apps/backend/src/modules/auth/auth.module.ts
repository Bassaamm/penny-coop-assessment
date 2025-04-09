import { Module } from '@nestjs/common';
import { AuthController } from './web/resource/auth.controller';
import { AuthService } from './core/services/auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ApiConfigService } from '../../shared/services/api-config.service';
import { SharedModule } from '../../shared/shared.module';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './infrastructure/strategy/jwt.strategy';
import { RefreshTokenIdsStorage } from './infrastructure/strategy/refresh-token-ids-storage';
import { LocalStrategy } from './infrastructure/strategy/local.strategy';
import { JwtRefreshTokenStrategy } from './infrastructure/strategy/jwt-refresh-token.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [SharedModule],
      useFactory: async (configService: ApiConfigService) =>
        configService.jwtConfig,
      inject: [ApiConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthService,
    LocalStrategy,
    JwtStrategy,
    ApiConfigService,
    JwtRefreshTokenStrategy,
    RefreshTokenIdsStorage,
  ],
})
export class AuthModule {}
