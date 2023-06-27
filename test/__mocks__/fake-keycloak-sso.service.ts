/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  GenerateTokenDto,
  GenerateTokenResponseDto,
  UserInfoDto,
} from '@modules/auth/dtos';
import { SsoService } from '@modules/auth/sso.service';

export class FakeKeycloakSsoService implements SsoService {
  async generateToken(
    _input: GenerateTokenDto,
  ): Promise<GenerateTokenResponseDto> {
    return Promise.resolve({
      access_token: 'string',
      expires_in: 0,
      refresh_expires_in: 0,
      token_type: 'string',
      id_token: 'string',
      'not-before-policy': 0,
      scope: 'string',
    });
  }

  async validateToken(accessToken: string): Promise<UserInfoDto> {
    return Promise.resolve({
      sub: 'string',
      email_verified: false,
      preferred_username: 'service-account-customers',
    });
  }
}
