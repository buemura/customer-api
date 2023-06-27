import { ApiProperty } from '@nestjs/swagger';

export class CustomerResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  document: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  createdAt: Date;
}
