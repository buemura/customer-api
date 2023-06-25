import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

import {
  CacheRepository,
  CacheStructDto,
} from '@modules/cache/cache.repository';

@Injectable()
export class RedisCacheService implements CacheRepository {
  private client: Redis;

  constructor() {
    this.client = new Redis();
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
