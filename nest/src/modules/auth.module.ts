import { Module } from '@nestjs/common';
import { UserModule } from '../modules/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwt_secret } from '../constants/constants';
import { AuthService } from '../services/auth.service';
import { JwtStrategy } from '../auth/jwt.strategy';
import { AuthResolver } from '../resolvers/auth.resolver';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwt_secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, AuthResolver, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
