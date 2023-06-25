import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { GenerateTokenDto, GetUserInfoDto } from './dtos';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('token')
  @HttpCode(HttpStatus.OK)
  async generateToken(@Body() body: GenerateTokenDto) {
    return this.authService.generateTokenSSO(body);
  }

  @Get('userinfo')
  async getUserInfo(@Body() body: GetUserInfoDto) {
    return this.authService.validateTokenSSO(body.access_token);
  }
}
