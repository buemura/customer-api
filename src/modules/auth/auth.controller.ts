import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import {
  GenerateTokenDto,
  GenerateTokenResponseDto,
  GetUserInfoDto,
  UserInfoDto,
} from './dtos';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('token')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: GenerateTokenResponseDto })
  async generateToken(
    @Body() body: GenerateTokenDto,
  ): Promise<GenerateTokenResponseDto> {
    return this.authService.generateTokenSSO(body);
  }

  @Post('userinfo')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: UserInfoDto })
  async getUserInfo(@Body() body: GetUserInfoDto): Promise<UserInfoDto> {
    return this.authService.validateTokenSSO(body.access_token);
  }
}
