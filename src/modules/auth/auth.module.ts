import { KeycloakSsoService } from '@infra/services/keycloak-sso.service';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SsoService } from './sso.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: SsoService,
      useClass: KeycloakSsoService,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
