import {
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiConfigService } from '../../../../shared/services/api-config.service';
import Redis from 'ioredis';
export class InvalidatedRefreshTokenError extends Error {}

// used for storing and validating refresh tokens
@Injectable()
export class RefreshTokenIdsStorage
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  private redisClient: Redis;

  constructor(private readonly configService: ApiConfigService) {}

  onApplicationBootstrap() {
    this.redisClient = new Redis(this.configService.redisConfig);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onApplicationShutdown(signal?: string) {
    return this.redisClient.quit();
  }

  async insert(userId: string, tokenId: string): Promise<void> {
    await this.redisClient.set(this.getKey(userId), tokenId);
  }

  async fetch(userId: string) {
    return this.redisClient.get(this.getKey(userId), (err, res) => {
      if (err) throw new UnauthorizedException('Invalid token');
      return res;
    });
  }

  async validate(userId: string, tokenId: string): Promise<boolean> {
    const storedId = await this.redisClient.get(this.getKey(userId));
    if (storedId !== tokenId) {
      throw new InvalidatedRefreshTokenError();
    }
    return storedId === tokenId;
  }

  async invalidate(userId: string): Promise<void> {
    await this.redisClient.del(this.getKey(userId));
  }

  private getKey(userId: string): string {
    return `user-${userId}`;
  }
}
