import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisOptions } from 'ioredis';

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

  get redisConfig(): RedisOptions {
    return {
      host: this.get('REDIS_HOST') || 'localhost',
      port: this.getInt('REDIS_PORT') || 6379,
      password: this.get('REDIS_PASSWORD'),
      username: this.get('REDIS_USERNAME'),
      tls: this.getBoolean('REDIS_TLS') ? { rejectUnauthorized: false } : undefined,
    };
  }
}
