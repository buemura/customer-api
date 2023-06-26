import { Module } from '@nestjs/common';

import { KeycloakSsoService } from '@infra/sso/keycloak-sso.service';
import { SsoService } from './sso.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [
    {
      provide: SsoService,
      useClass: KeycloakSsoService,
    },
  ],
  exports: [SsoService],
})
export class SsoModule {}
