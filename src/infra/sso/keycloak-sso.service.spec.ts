import axios from 'axios';

import { KeycloakSsoService } from './keycloak-sso.service';

describe('KeycloakSsoService', () => {
  const ssoUrl = process.env.SSO_URL;
  let ssoService: KeycloakSsoService;

  beforeEach(() => {
    ssoService = new KeycloakSsoService();
  });

  it('should generate a token successfully', async () => {
    const mockResponse = {
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
    };
    const axiosPostSpy = jest
      .spyOn(axios, 'post')
      .mockResolvedValueOnce(mockResponse);

    const mockInput = {
      grant_type: 'string',
      client_id: 'string',
      client_secret: 'string',
      username: 'string',
      password: 'string',
      scope: 'string',
    };

    const result = await ssoService.generateToken(mockInput);
    expect(axiosPostSpy).toHaveBeenCalledWith(`${ssoUrl}/token`, mockInput, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    expect(result).toEqual(mockResponse);
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
