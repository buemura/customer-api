import { ApiProperty } from '@nestjs/swagger';

export class GenerateTokenDto {
  @ApiProperty()
  grant_type: string;

  @ApiProperty()
  client_id: string;

  @ApiProperty()
  client_secret: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  scope: string;
}
