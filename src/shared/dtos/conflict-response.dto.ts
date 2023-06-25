import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class ConflictResponseDto {
  @ApiProperty({ default: HttpStatus.CONFLICT })
  statusCode: number;

  @ApiProperty()
  message: string;

  @ApiProperty({ default: 'Conflict' })
  error: string;
}
