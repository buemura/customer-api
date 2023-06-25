import { SsoService } from '@modules/sso/sso.service';
import { Test, TestingModule } from '@nestjs/testing';
import { FakeKeycloakSsoService } from 'test/__mocks__/fake-keycloak-sso.service';
import { AuthService } from '../auth.service';

describe('AuthService', () => {
  let sut: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: SsoService,
          useClass: FakeKeycloakSsoService,
        },
      ],
    }).compile();

    sut = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should validate a token successfully', async () => {
    const result = await sut.validateTokenSSO('access_token');
    expect(result).toHaveProperty('status');
    expect(result).toHaveProperty('data');
  });
});
