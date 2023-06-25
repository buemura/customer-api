import {
  Body,
  ConflictException,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadGatewayResponse,
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { JwtGuard } from '@modules/auth/guards/jwt.guard';
import {
  BadGatewayResponseDto,
  ConflictResponseDto,
  NotFoundResponseDto,
  UnauthorizedResponseDto,
} from '@shared/dtos';
import { BadRequestResponseDto } from '@shared/dtos/bad-request-response.dto';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dtos/create-customer.dto';
import { CustomerResponseDto } from './dtos/customer-response.dto';
import { UpdateCustomerDto } from './dtos/update-customer.dto';
import { ERROR_MESSAGE } from './errors/messages';

@ApiTags('Customers')
@ApiUnauthorizedResponse({ type: UnauthorizedResponseDto })
@ApiBadGatewayResponse({
  description: 'When SSO or Cache is unavailable.',
  type: BadGatewayResponseDto,
})
@UseGuards(JwtGuard)
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ type: CustomerResponseDto })
  @ApiNotFoundResponse({
    description: 'If the customer passed in id not exists.',
    type: NotFoundResponseDto,
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
  @ApiBadRequestResponse({ type: BadRequestResponseDto })
  async create(@Body() data: CreateCustomerDto): Promise<CustomerResponseDto> {
    return this.customersService.create(data);
  }

  @Put(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ type: CustomerResponseDto })
  @ApiBadRequestResponse({ type: BadRequestResponseDto })
  @ApiNotFoundResponse({
    description: 'If the customer passed in id not exists.',
    type: NotFoundResponseDto,
  })
  @ApiConflictResponse({
    description:
      'If the path patam Id conflicts with the id from request body.',
    type: ConflictResponseDto,
  })
  async update(
    @Param('id') id: string,
    @Body() data: UpdateCustomerDto,
  ): Promise<CustomerResponseDto> {
    if (id !== data.id) {
      throw new ConflictException(ERROR_MESSAGE.CUSTOMER_ID_CONFLICT);
    }

    const customer = await this.customersService.update(id, data);
    if (!customer) {
      throw new NotFoundException(ERROR_MESSAGE.CUSTOMER_NOT_FOUND);
    }

    return customer;
  }
}
