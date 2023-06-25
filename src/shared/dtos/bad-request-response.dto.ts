import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class BadRequestResponseDto {
  @ApiProperty({ default: HttpStatus.BAD_REQUEST })
  statusCode: number;

  @ApiProperty()
  message: string[];

  @ApiProperty({ default: 'Bad Request' })
  error: string;
}
