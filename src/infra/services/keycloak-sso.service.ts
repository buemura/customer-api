import {
  BadGatewayException,
  HttpStatus,
  Injectable,
  Logger,
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
  private readonly logger: Logger;

  constructor(private readonly configService: ConfigService) {
    this.logger = new Logger(KeycloakSsoService.name);
  }

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
      this.logger.log('Generating accessToken');

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

      this.logger.log('Successfully generated accessToken');
      return data;
    } catch (error) {
      this.logger.log('Failed to generate accessToken');
      this.validateHttpStatus(error.response.status);
    }
  }

  async validateToken(accessToken: string): Promise<UserInfoDto> {
    try {
      this.logger.log('Validating accessToken');

      const { data } = await axios.get(
        `${this.configService.get('SSO_URL')}/userinfo`,
        {
          headers: { Authorization: 'Bearer ' + accessToken },
        },
      );

      this.logger.log('Successfully validated accessToken');
      return data;
    } catch (error) {
      this.logger.log('Failed to validate accessToken');
      this.validateHttpStatus(error.response.status);
    }
  }
}
