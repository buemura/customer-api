import { Injectable } from '@nestjs/common';

import { SsoService } from '@modules/sso/sso.service';
import { HttpResponse } from '@shared/dtos/http-response.dto';
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
  ): Promise<HttpResponse<GenerateTokenResponseDto>> {
    return this.ssoService.generateToken(data);
  }

  async validateTokenSSO(
    accessToken: string,
  ): Promise<HttpResponse<UserInfoDto>> {
    return this.ssoService.validateToken(accessToken);
  }
}
