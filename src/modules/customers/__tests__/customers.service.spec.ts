import { Test, TestingModule } from '@nestjs/testing';

import { CacheRepository } from '@modules/cache/cache.repository';
import { FakeRedisCacheRepository } from 'test/__mocks__/fake-redis-cache.repository';
import { CustomersService } from '../customers.service';

describe('CustomersService', () => {
  let sut: CustomersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomersService,
        {
          provide: CacheRepository,
          useClass: FakeRedisCacheRepository,
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
});
