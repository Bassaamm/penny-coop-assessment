import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModuleFactoryOptions } from '@nestjs/mongoose';

@Injectable()
export class ApiConfigService {
  @Inject()
  private configService: ConfigService;

  private get(key: string): string {
    return this.configService.get(key);
  }

  private getBoolean(key: string): boolean {
    return this.get(key) === 'true';
  }

  private getInt(key: string): number {
    return parseInt(this.get(key));
  }
  get appConfig() {
    return {
      appUrl: this.get('APP_URL'),
      appHttpSecure: this.get('APP_HTTP_SECURE') === 'true',
    };
  }
  get refreshTokenConfig(): { refreshTokenExpiresIn: string } {
    return {
      refreshTokenExpiresIn:
        this.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME') || '1d',
    };
  }

  get jwtConfig(): {
    secret: string;
    signOptions: {
      expiresIn: string;
    };
  } {
    return {
      secret: this.get('JWT_SECRET') || 'secretKey',
      signOptions: { expiresIn: this.get('JWT_EXPIRATION_TIME') || '1h' },
    };
  }

  get monogodbConfig(): MongooseModuleFactoryOptions {
    return {
      uri: this.get('MONGODB_URI'),
      auth: {
        username: this.get('MONGODB_USERNAME'),
        password: this.get('MONGODB_PASSWORD'),
      },
    } as MongooseModuleFactoryOptions;
  }

  get redisConfig() {
    return this.get('REDIS_URL');
  }
}
