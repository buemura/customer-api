import { Body, Controller, Get } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { GetUserInfoDto } from './dtos';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('userinfo')
  async getUserInfo(@Body() body: GetUserInfoDto) {
    return this.authService.validateTokenSSO(body.access_token);
  }
}
