import { SsoService } from '@modules/sso/sso.service';
import { Test, TestingModule } from '@nestjs/testing';
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
      const mockResult = {
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
      const generateTokenSSOSpy = jest
        .spyOn(authService, 'generateTokenSSO')
        .mockResolvedValueOnce(mockResult);

      const mockBody = {
        grant_type: 'string',
        client_id: 'string',
        client_secret: 'string',
        username: 'string',
        password: 'string',
        scope: 'string',
      };
      const result = await sut.generateToken(mockBody);
      expect(generateTokenSSOSpy).toHaveBeenCalledWith(mockBody);
      expect(result).toEqual(mockResult);
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
