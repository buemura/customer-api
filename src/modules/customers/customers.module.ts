import { Module } from '@nestjs/common';

import { CacheModule } from '@modules/cache/cache.module';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';

@Module({
  imports: [CacheModule],
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule {}
