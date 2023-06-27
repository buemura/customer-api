import { Injectable } from '@nestjs/common';

import { SsoService } from '@modules/auth/sso.service';
import {
  GenerateTokenDto,
  GenerateTokenResponseDto,
  UserInfoDto,
} from './dtos';

@Injectable()
export class AuthService {
  constructor(private readonly ssoService: SsoService) {}

  async generateTokenSSO(
    data: GenerateTokenDto,
  ): Promise<GenerateTokenResponseDto> {
    return this.ssoService.generateToken(data);
  }

  async validateTokenSSO(accessToken: string): Promise<UserInfoDto> {
    return this.ssoService.validateToken(accessToken);
  }
}
