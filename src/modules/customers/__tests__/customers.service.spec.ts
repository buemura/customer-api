import { CacheRepository } from '@modules/cache/cache.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { FakeRedisCacheRepository } from 'test/__mocks__/fake-redis-cache.repository';
import { CustomersService } from '../customers.service';

describe('CustomersService', () => {
  let service: CustomersService;

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

    service = module.get<CustomersService>(CustomersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
