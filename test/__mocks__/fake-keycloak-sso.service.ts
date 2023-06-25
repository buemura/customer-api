import {
  GenerateTokenDto,
  GenerateTokenResponseDto,
  UserInfoDto,
} from '@modules/sso/dtos';
import { SsoService } from '@modules/sso/sso.service';
import { HttpResponse } from '@shared/dtos/http-response.dto';

export class FakeKeycloakSsoService implements SsoService {
  async generateToken(
    input: GenerateTokenDto,
  ): Promise<HttpResponse<GenerateTokenResponseDto>> {
    return Promise.resolve({
      status: 200,
      data: {
        access_token: 'string',
        expires_in: 0,
        refresh_expires_in: 0,
        token_type: 'string',
        id_token: 'string',
        'not-before-policy': 0,
        scope: 'string',
      },
    });
  }

  async validateToken(accessToken: string): Promise<HttpResponse<UserInfoDto>> {
    return Promise.resolve({
      status: 200,
      data: {
        sub: 'string',
        email_verified: false,
        preferred_username: 'service-account-customers',
      },
    });
  }
}
