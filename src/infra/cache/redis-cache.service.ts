import { BadGatewayException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

import { CacheService } from '@modules/cache/cache.service';
import { SetCacheDto } from '@modules/cache/dtos/set-cache.dto';
import { ERROR_MESSAGE } from '@modules/cache/errors/message';

@Injectable()
export class RedisCacheService implements CacheService {
  private client: Redis;

  constructor(private configService: ConfigService) {
    this.client = new Redis({
      host: this.configService.get<string>('REDIS_HOST'),
      port: this.configService.get<number>('REDIS_PORT'),
    });
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      const value = await this.client.get(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      throw new BadGatewayException(ERROR_MESSAGE.CACHE_UNAVAILABLE);
    }
  }

  async set(data: SetCacheDto): Promise<void> {
    try {
      await this.client.set(data.key, JSON.stringify(data.value));
    } catch (error) {
      throw new BadGatewayException(ERROR_MESSAGE.CACHE_UNAVAILABLE);
    }
  }

  async remove(key: string): Promise<void> {
    try {
      await this.client.del(key);
    } catch (error) {
      throw new BadGatewayException(ERROR_MESSAGE.CACHE_UNAVAILABLE);
    }
  }
}
