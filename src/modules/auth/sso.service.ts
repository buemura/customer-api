import {
  GenerateTokenDto,
  GenerateTokenResponseDto,
  UserInfoDto,
} from './dtos';

export abstract class SsoService {
  abstract generateToken(
    input: GenerateTokenDto,
  ): Promise<GenerateTokenResponseDto>;

  abstract validateToken(accessToken: string): Promise<UserInfoDto>;
}
