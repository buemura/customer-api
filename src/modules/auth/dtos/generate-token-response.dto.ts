import { ApiProperty } from '@nestjs/swagger';

export class GenerateTokenResponseDto {
  @ApiProperty()
  access_token: string;

  @ApiProperty()
  expires_in: number;
}
