import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class BadGatewayResponseDto {
  @ApiProperty({ default: HttpStatus.BAD_GATEWAY })
  statusCode: number;

  @ApiProperty()
  message: string;
}
