import { Module } from '@nestjs/common';
import { AuthController } from './web/resource/auth.controller';
import { AuthService } from './core/services/auth.service';

@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [SharedModule],
      useFactory: async (configService: ApiConfigService) =>
        configService.jwtConfig,
      inject: [ApiConfigService],
    }),],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
