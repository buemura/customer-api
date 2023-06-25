import { Injectable } from '@nestjs/common';

import { CacheRepository } from '@modules/cache/cache.repository';
import { KEY_PREFIX } from '@shared/constants/redis';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomersService {
  constructor(private readonly cacheRepository: CacheRepository) {}

  async findById(id: string): Promise<Customer> {
    const customer = await this.cacheRepository.get<Customer>(
      KEY_PREFIX.CUSTOMER + ':' + id,
    );

    if (!customer) {
      return null;
    }

    return customer;
  }
}
