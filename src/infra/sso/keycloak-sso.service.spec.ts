import axios from 'axios';

import {
  mockGenerateTokenInput,
  mockGenerateTokenResponse,
} from 'test/__mocks__/generate-token.mock';
import { KeycloakSsoService } from './keycloak-sso.service';

describe('KeycloakSsoService', () => {
  const ssoUrl = process.env.SSO_URL;
  let ssoService: KeycloakSsoService;

  beforeEach(() => {
    ssoService = new KeycloakSsoService();
  });

  it('should generate a token successfully', async () => {
    const axiosPostSpy = jest
      .spyOn(axios, 'post')
      .mockResolvedValueOnce(mockGenerateTokenResponse);

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
    const mockResponse = {
      status: 200,
      data: {
        sub: 'string',
        email_verified: false,
        preferred_username: 'string',
      },
    };
    const axiosGetSpy = jest
      .spyOn(axios, 'get')
      .mockResolvedValueOnce(mockResponse);

    const mockAccessToken = 'mock-access-token';
    const result = await ssoService.validateToken(mockAccessToken);
    expect(axiosGetSpy).toHaveBeenCalledWith(`${ssoUrl}/userinfo`, {
      headers: {
        Authorization: 'Bearer ' + mockAccessToken,
      },
    });
    expect(result).toEqual(mockResponse);
  });
});
