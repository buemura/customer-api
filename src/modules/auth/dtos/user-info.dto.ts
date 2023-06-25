import { ApiProperty } from '@nestjs/swagger';

export class UserInfoDto {
  @ApiProperty()
  sub: string;

  @ApiProperty()
  email_verified: boolean;

  @ApiProperty()
  preferred_username: string;
}
