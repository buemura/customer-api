import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty()
  @IsNotEmpty()
  document: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
}
