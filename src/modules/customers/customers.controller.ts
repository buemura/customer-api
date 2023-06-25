import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { NotFoundResponse } from '@shared/dtos/not-found-response.dto';
import { ERROR_MESSAGE } from '@shared/errors/messages';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dtos/create-customer.dto';
import { CustomerResponseDto } from './dtos/customer-response.dto';
import { UpdateCustomerDto } from './dtos/update-customer.dto';

@ApiTags('Customers')
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ type: CustomerResponseDto })
  @ApiNotFoundResponse({
    description: 'If the customer passed in id not exists.',
    type: NotFoundResponse,
  })
  async findById(@Param('id') id: string): Promise<CustomerResponseDto> {
    const customer = await this.customersService.findById(id);
    if (!customer) {
      throw new NotFoundException(ERROR_MESSAGE.CUSTOMER_NOT_FOUND);
    }

    return customer;
  }

  @Post()
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: CustomerResponseDto })
  async create(@Body() data: CreateCustomerDto): Promise<CustomerResponseDto> {
    return this.customersService.create(data);
  }

  @Put(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ type: CustomerResponseDto })
  @ApiNotFoundResponse({
    description: 'If the customer passed in id not exists.',
    type: NotFoundResponse,
  })
  async update(
    @Param('id') id: string,
    @Body() data: UpdateCustomerDto,
  ): Promise<CustomerResponseDto> {
    const customer = await this.customersService.update(id, data);
    if (!customer) {
      throw new NotFoundException(ERROR_MESSAGE.CUSTOMER_NOT_FOUND);
    }

    return customer;
  }
}
