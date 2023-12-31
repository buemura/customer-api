import axios from 'axios';

import { ConfigService } from '@nestjs/config';
import {
  mockGenerateTokenInput,
  mockGenerateTokenResponse,
} from 'test/__mocks__/generate-token.mock';
import {
  mockValidateTokenInput,
  mockValidateTokenResponse,
} from 'test/__mocks__/validate-token.mock';
import { KeycloakSsoService } from './keycloak-sso.service';

describe('KeycloakSsoService', () => {
  const ssoUrl = process.env.SSO_URL;
  let configService: ConfigService;
  let ssoService: KeycloakSsoService;

  beforeEach(() => {
    configService = new ConfigService();
    ssoService = new KeycloakSsoService(configService);
  });

  it('should generate a token successfully', async () => {
    const axiosPostSpy = jest
      .spyOn(axios, 'post')
      .mockResolvedValueOnce({ data: mockGenerateTokenResponse });

    const result = await ssoService.generateToken(mockGenerateTokenInput);

    expect(axiosPostSpy).toHaveBeenCalledWith(
      `${ssoUrl}/token`,
      mockGenerateTokenInput,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    expect(result).toEqual(mockGenerateTokenResponse);
  });

  it('should validate a token successfully', async () => {
    const axiosGetSpy = jest
      .spyOn(axios, 'get')
      .mockResolvedValueOnce({ data: mockValidateTokenResponse });

    const result = await ssoService.validateToken(
      mockValidateTokenInput.access_token,
    );
    expect(axiosGetSpy).toHaveBeenCalledWith(`${ssoUrl}/userinfo`, {
      headers: {
        Authorization: 'Bearer ' + mockValidateTokenInput.access_token,
      },
    });

    expect(result).toEqual(mockValidateTokenResponse);
  });
});
