import { ApiProperty } from '@nestjs/swagger';

export class NotFoundResponseDto {
  @ApiProperty({ default: 404 })
  statusCode: number;

  @ApiProperty()
  message: string;

  @ApiProperty({ default: 'Not found' })
  error: string;
}
