import { LoggerModule } from './../../utils/logger.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersService } from 'services/auth/users.service';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule} from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Module({
  imports: [
    LoggerModule,
    ConfigModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
      secretOrPrivateKey: jwtConstants.secret,
    }),
  ],
  providers: [AuthService, UsersService, LocalStrategy, JwtStrategy],
  exports: [AuthService, UsersService],
})
export class AuthModule {}
