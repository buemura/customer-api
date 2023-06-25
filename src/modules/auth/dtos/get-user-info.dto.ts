import { ApiProperty } from '@nestjs/swagger';

export class GetUserInfoDto {
  @ApiProperty()
  access_token: string;
}
