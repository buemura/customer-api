import { HttpResponse } from '@shared/dtos/http-response.dto';
import {
  GenerateTokenDto,
  GenerateTokenResponseDto,
  UserInfoDto,
} from './dtos';

export abstract class SsoService {
  abstract generateToken(
    input: GenerateTokenDto,
  ): Promise<HttpResponse<GenerateTokenResponseDto>>;

  abstract validateToken(
    accessToken: string,
  ): Promise<HttpResponse<UserInfoDto>>;
}
