import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class UnauthorizedResponseDto {
  @ApiProperty({ default: HttpStatus.UNAUTHORIZED })
  statusCode: number;

  @ApiProperty({ default: 'Unauthorized' })
  message: string;
}
