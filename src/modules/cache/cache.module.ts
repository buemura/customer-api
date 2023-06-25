import { Module } from '@nestjs/common';

import { RedisCacheService } from '@infra/cache/redis-cache.service';
import { CacheService } from './cache.service';

@Module({
  providers: [
    {
      provide: CacheService,
      useClass: RedisCacheService,
    },
  ],
  exports: [CacheService],
})
export class CacheModule {}
