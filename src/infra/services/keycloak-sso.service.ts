import {
  BadGatewayException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

import {
  GenerateTokenDto,
  GenerateTokenResponseDto,
  UserInfoDto,
} from '@modules/auth/dtos';
import { ERROR_MESSAGE } from '@modules/auth/errors/message';
import { SsoService } from '@modules/auth/sso.service';

@Injectable()
export class KeycloakSsoService implements SsoService {
  constructor(private readonly configService: ConfigService) {}

  private validateHttpStatus(status: number) {
    if (status === HttpStatus.UNAUTHORIZED) {
      throw new UnauthorizedException();
    }

    if (status > HttpStatus.INTERNAL_SERVER_ERROR) {
      throw new BadGatewayException(ERROR_MESSAGE.SSO_UNAVAILABLE);
    }
  }

  async generateToken(
    input: GenerateTokenDto,
  ): Promise<GenerateTokenResponseDto> {
    try {
      const { data } = await axios.post(
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

      return data;
    } catch (error) {
      this.validateHttpStatus(error.response.status);
    }
  }

  async validateToken(accessToken: string): Promise<UserInfoDto> {
    try {
      const { data } = await axios.get(
        `${this.configService.get('SSO_URL')}/userinfo`,
        {
          headers: { Authorization: 'Bearer ' + accessToken },
        },
      );

      return data;
    } catch (error) {
      this.validateHttpStatus(error.response.status);
    }
  }
}
