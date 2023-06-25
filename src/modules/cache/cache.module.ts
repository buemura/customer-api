import { Module } from '@nestjs/common';

import { CacheRepository } from './cache.repository';

@Module({
  exports: [CacheRepository],
})
export class CacheModule {}
