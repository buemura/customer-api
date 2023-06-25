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
  });
});
