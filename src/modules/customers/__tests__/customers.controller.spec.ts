import { CacheRepository } from '@modules/cache/cache.repository';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { randomUUID } from 'crypto';

import { CustomersController } from '../customers.controller';
import { CustomersService } from '../customers.service';
import { CreateCustomerDto } from '../dtos/create-customer.dto';
import { UpdateCustomerDto } from '../dtos/update-customer.dto';
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

  describe('create', () => {
    it('should create a new customer', async () => {
      const mockCustomer: Customer = {
        id: randomUUID(),
        document: 100,
        name: 'Neil deGrasse Tyson',
        createdAt: new Date(),
      };
      jest.spyOn(customersService, 'create').mockResolvedValue(mockCustomer);

      const createCustomerDto: CreateCustomerDto = {
        document: 100,
        name: 'Neil deGrasse Tyson',
      };
      const result = await sut.create(createCustomerDto);
      expect(customersService.create).toHaveBeenCalledWith(createCustomerDto);
      expect(result).toEqual(mockCustomer);
    });
  });

  describe('update', () => {
    const customerId = '1';
    const updateCustomerDto: UpdateCustomerDto = {
      id: customerId,
      document: 999,
      name: 'John Doe',
    };

    it('should throw NotFoundException when customer not found', async () => {
      jest.spyOn(customersService, 'update').mockResolvedValue(null);
      await expect(
        sut.update(customerId, updateCustomerDto),
      ).rejects.toThrowError(NotFoundException);
    });

    it('should update an existing customer', async () => {
      const mockCustomer: Customer = {
        ...updateCustomerDto,
        createdAt: new Date(),
      };
      jest.spyOn(customersService, 'update').mockResolvedValue(mockCustomer);

      const result = await sut.update(customerId, updateCustomerDto);
      expect(customersService.update).toHaveBeenCalledWith(
        customerId,
        updateCustomerDto,
      );
      expect(result).toEqual(mockCustomer);
    });
  });
});
