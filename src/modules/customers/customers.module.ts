import { Module } from '@nestjs/common';

import { AuthModule } from '@modules/auth/auth.module';
import { CacheModule } from '@modules/cache/cache.module';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';

@Module({
  imports: [AuthModule, CacheModule],
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule {}
