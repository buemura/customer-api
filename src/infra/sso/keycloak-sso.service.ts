import { Injectable } from '@nestjs/common';
import axios from 'axios';

import {
  GenerateTokenDto,
  GenerateTokenResponseDto,
  UserInfoDto,
} from '@modules/sso/dtos';
import { SsoService } from '@modules/sso/sso.service';
import { HttpResponse } from '@shared/dtos/http-response.dto';

@Injectable()
export class KeycloakSsoService implements SsoService {
  private readonly ssoUrl = process.env.SSO_URL;

  async generateToken(
    input: GenerateTokenDto,
  ): Promise<HttpResponse<GenerateTokenResponseDto>> {
    const { status, data } = await axios.post(`${this.ssoUrl}/token`, input, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return {
      status,
      data,
    };
  }

  async validateToken(accessToken: string): Promise<HttpResponse<UserInfoDto>> {
    const { status, data } = await axios.get(`${this.ssoUrl}/userinfo`, {
      headers: { Authorization: 'Bearer ' + accessToken },
    });

    return {
      status,
      data,
    };
  }
}
