import { Injectable, Logger } from '@nestjs/common';

import { CacheService } from '@modules/cache/cache.service';
import { KEY_PREFIX } from '@shared/constants/redis';
import { CreateCustomerDto } from './dtos/create-customer.dto';
import { UpdateCustomerDto } from './dtos/update-customer.dto';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomersService {
  private readonly logger: Logger;

  constructor(private readonly cacheService: CacheService) {
    this.logger = new Logger(CustomersService.name);
  }

  async findById(id: string): Promise<Customer> {
    this.logger.log('Getting customer by id: ' + id);
    const customer = await this.cacheService.get<Customer>(
      KEY_PREFIX.CUSTOMER + ':' + id,
    );

    if (!customer) {
      this.logger.log('No customer found for id: ' + id);
      return null;
    }

    this.logger.log('Found Customer for id: ' + id);
    return customer;
  }

  async create(data: CreateCustomerDto): Promise<Customer> {
    const newCustomer = new Customer({
      document: data.document,
      name: data.name,
    });

    await this.cacheService.set({
      key: KEY_PREFIX.CUSTOMER + ':' + newCustomer.id,
      value: newCustomer,
    });

    this.logger.log('Customer created successfully');
    return newCustomer;
  }

  async update(id: string, data: UpdateCustomerDto): Promise<Customer> {
    const customer = await this.findById(id);
    if (!customer) {
      return null;
    }

    const newCustomer = new Customer({
      id: customer.id,
      document: data.document ?? customer.document,
      name: data.name ?? customer.name,
    });

    await this.cacheService.set({
      key: KEY_PREFIX.CUSTOMER + ':' + newCustomer.id,
      value: newCustomer,
    });

    this.logger.log('Customer updated successfully');
    return newCustomer;
  }
}
