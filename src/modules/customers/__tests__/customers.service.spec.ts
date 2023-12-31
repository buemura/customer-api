import { Test, TestingModule } from '@nestjs/testing';

import { CacheService } from '@modules/cache/cache.service';
import { FakeRedisCacheService } from 'test/__mocks__/fake-redis-cache.service';
import { CustomersService } from '../customers.service';
import { UpdateCustomerDto } from '../dtos/update-customer.dto';

describe('CustomersService', () => {
  let sut: CustomersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomersService,
        {
          provide: CacheService,
          useClass: FakeRedisCacheService,
        },
      ],
    }).compile();

    sut = module.get<CustomersService>(CustomersService);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  describe('findById', () => {
    it('should return null when customer is not found', async () => {
      const id = '809357ef-f537-4460-a71f-d859d01f74ec';
      const customer = await sut.findById(id);
      expect(customer).toBeNull();
    });

    it('should return the customer by Id', async () => {
      const id = 'c0358342-caa7-46d5-b86b-f803899f71bc';
      const customer = await sut.findById(id);
      expect(customer).toBeDefined();
      expect(customer.id).toEqual(id);
    });
  });

  describe('create', () => {
    it('should create a customer', async () => {
      const result = await sut.create({ document: 99, name: 'jane doe' });
      expect(result).toBeDefined();
      expect(result.document).toEqual(99);
      expect(result.name).toEqual('jane doe');
    });
  });

  describe('update', () => {
    it('should return null when customer is not found', async () => {
      const id = '809357ef-f537-4460-a71f-d859d01f74ec';
      const customer = await sut.findById(id);
      expect(customer).toBeNull();
    });

    it('should return the updated customer', async () => {
      const id = 'c0358342-caa7-46d5-b86b-f803899f71bc';
      const customerBeforeUpdate = await sut.findById(id);
      expect(customerBeforeUpdate).toBeDefined();
      expect(customerBeforeUpdate.id).toEqual(id);
      expect(customerBeforeUpdate.document).toEqual(1);
      expect(customerBeforeUpdate.name).toEqual('john doe');

      const data: UpdateCustomerDto = {
        id,
        document: 999,
        name: 'jane doe',
      };
      const customer = await sut.update(id, data);
      expect(customer).toBeDefined();
      expect(customer.id).toEqual(id);
      expect(customer.document).toEqual(data.document);
      expect(customer.name).toEqual(data.name);
    });
  });
});
