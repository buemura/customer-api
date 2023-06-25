import { Injectable } from '@nestjs/common';

import { SsoService } from '@modules/sso/sso.service';
import { HttpResponse } from '@shared/dtos/http-response.dto';
import { UserInfoDto } from './dtos/user-info.dto';

@Injectable()
export class AuthService {
  constructor(private readonly ssoService: SsoService) {}

  async validateTokenSSO(
    accessToken: string,
  ): Promise<HttpResponse<UserInfoDto>> {
    return this.ssoService.validateToken(accessToken);
  }
}
