import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

import { CacheService, CacheStructDto } from '@modules/cache/cache.service';

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
    const value = await this.client.get(key);
    return value ? JSON.parse(value) : null;
  }

  async set(data: CacheStructDto): Promise<void> {
    await this.client.set(data.key, JSON.stringify(data.value));
  }

  async remove(key: string): Promise<void> {
    await this.client.del(key);
  }
}
