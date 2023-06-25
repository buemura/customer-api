import { SsoService } from '@modules/sso/sso.service';
import { Test, TestingModule } from '@nestjs/testing';
import {
  mockGenerateTokenInput,
  mockGenerateTokenResponse,
} from 'test/__mocks__/generate-token.mock';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';

describe('AuthController', () => {
  let sut: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        {
          provide: SsoService,
          useValue: () => null,
        },
      ],
    }).compile();

    sut = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  describe('generateToken', () => {
    it('should call generateTokenSSO and return the result', async () => {
      const generateTokenSSOSpy = jest
        .spyOn(authService, 'generateTokenSSO')
        .mockResolvedValueOnce(mockGenerateTokenResponse);

      const result = await sut.generateToken(mockGenerateTokenInput);
      expect(generateTokenSSOSpy).toHaveBeenCalledWith(mockGenerateTokenInput);
      expect(result).toEqual(mockGenerateTokenResponse);
    });
  });

  describe('getUserInfo', () => {
    it('should call validateTokenSSO and return the result', async () => {
      const mockResult = {
        status: 200,
        data: {
          sub: 'string',
          email_verified: false,
          preferred_username: 'string',
        },
      };
      const validateTokenSSOSpy = jest
        .spyOn(authService, 'validateTokenSSO')
        .mockResolvedValueOnce(mockResult);

      const mockBody = {
        access_token: 'mock-access-token',
      };
      const result = await sut.getUserInfo(mockBody);
      expect(validateTokenSSOSpy).toHaveBeenCalledWith(mockBody.access_token);
      expect(result).toEqual(mockResult);
    });
  });
});
