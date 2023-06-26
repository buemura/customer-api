import { Injectable } from '@nestjs/common';
import axios from 'axios';

import {
  GenerateTokenDto,
  GenerateTokenResponseDto,
  UserInfoDto,
} from '@modules/sso/dtos';
import { SsoService } from '@modules/sso/sso.service';
import { HttpResponse } from '@shared/dtos/http-response.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class KeycloakSsoService implements SsoService {
  constructor(private readonly configService: ConfigService) {}

  async generateToken(
    input: GenerateTokenDto,
  ): Promise<HttpResponse<GenerateTokenResponseDto>> {
    const { status, data } = await axios.post(
      `${this.configService.get('SSO_URL')}/token`,
      {
        grant_type: this.configService.get('SSO_GRANT_TYPE'),
        client_id: this.configService.get('SSO_CLIENT_ID'),
        client_secret: this.configService.get('SSO_CLIENT_SECRET'),
        scope: this.configService.get('SSO_SCOPE'),
        username: input.username,
        password: input.password,
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    return {
      status,
      data,
    };
  }

  async validateToken(accessToken: string): Promise<HttpResponse<UserInfoDto>> {
    const { status, data } = await axios.get(
      `${this.configService.get('SSO_URL')}/userinfo`,
      {
        headers: { Authorization: 'Bearer ' + accessToken },
      },
    );

    return {
      status,
      data,
    };
  }
}
