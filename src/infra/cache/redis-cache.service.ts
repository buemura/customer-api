import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

import { CacheService, CacheStructDto } from '@modules/cache/cache.service';
import { CacheUnavailableError } from '@shared/errors/cache-unavailable.error';

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
      throw new CacheUnavailableError();
    }
  }

  async set(data: CacheStructDto): Promise<void> {
    try {
      await this.client.set(data.key, JSON.stringify(data.value));
    } catch (error) {
      throw new CacheUnavailableError();
    }
  }

  async remove(key: string): Promise<void> {
    try {
      await this.client.del(key);
    } catch (error) {
      throw new CacheUnavailableError();
    }
  }
}
