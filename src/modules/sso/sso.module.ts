import { Module } from '@nestjs/common';

import { KeycloakSsoService } from '@infra/sso/keycloak-sso.service';
import { SsoService } from './sso.service';

@Module({
  providers: [
    {
      provide: SsoService,
      useClass: KeycloakSsoService,
    },
  ],
  exports: [SsoService],
})
export class SsoModule {}
