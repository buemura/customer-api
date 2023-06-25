import { SsoModule } from '@modules/sso/sso.module';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';

@Module({
  imports: [SsoModule],
  providers: [AuthService],
})
export class AuthModule {}
