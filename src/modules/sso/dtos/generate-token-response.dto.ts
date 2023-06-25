import { ApiProperty } from '@nestjs/swagger';

export class GenerateTokenResponseDto {
  @ApiProperty()
  access_token: string;

  @ApiProperty()
  expires_in: number;

  @ApiProperty()
  refresh_expires_in: number;

  @ApiProperty()
  token_type: string;

  @ApiProperty()
  id_token: string;

  @ApiProperty()
  'not-before-policy': number;

  @ApiProperty()
  scope: string;
}