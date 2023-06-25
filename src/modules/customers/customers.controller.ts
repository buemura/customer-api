import { Controller, Get, NotFoundException, Param } from '@nestjs/common';

import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { CustomersService } from './customers.service';
import { CustomerResponseDto } from './dtos/customer-response.dto';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get(':id')
  @ApiBearerAuth()
  @ApiResponse({ type: CustomerResponseDto })
  async findById(@Param('id') id: string): Promise<CustomerResponseDto> {
    const customer = await this.customersService.findById(id);
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    return customer;
  }
}
