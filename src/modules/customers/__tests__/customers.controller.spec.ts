import { CacheRepository } from '@modules/cache/cache.repository';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { CustomersController } from '../customers.controller';
import { CustomersService } from '../customers.service';
import { Customer } from '../entities/customer.entity';

describe('CustomersController', () => {
  let sut: CustomersController;
  let customersService: CustomersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomersController],
      providers: [
        CustomersService,
        {
          provide: CacheRepository,
          useValue: () => null,
        },
      ],
    }).compile();

    sut = module.get<CustomersController>(CustomersController);
    customersService = module.get<CustomersService>(CustomersService);
  });

  describe('findById', () => {
    it('should throw NotFoundException when customer not found', async () => {
      jest.spyOn(customersService, 'findById').mockResolvedValue(null);
      await expect(sut.findById('1')).rejects.toThrowError(NotFoundException);
    });

    it('should return a customer when found', async () => {
      const mockCustomer: Customer = {
        id: '1',
        document: 1,
        name: 'John Doe',
        createdAt: new Date(),
      };
      jest.spyOn(customersService, 'findById').mockResolvedValue(mockCustomer);
      const result = await sut.findById('1');
      expect(customersService.findById).toHaveBeenCalledWith('1');
      expect(result).toEqual(mockCustomer);
    });
  });
});
