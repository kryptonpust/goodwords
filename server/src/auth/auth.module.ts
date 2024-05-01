import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { EnvConfig } from 'src/env-config/env-config';
import { UserModule } from 'src/user/user.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    forwardRef(() => UserModule),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [EnvConfig],
      useFactory: async (envConfig: EnvConfig) => {
        return {
          secret: envConfig.JWT_SECRET,
          signOptions: { expiresIn: envConfig.JWT_EXPIRES_IN },
        };
      },
      inject: [EnvConfig],
    }),
  ],
  providers: [AuthResolver, AuthService, JwtStrategy, LocalStrategy],
})
export class AuthModule {}
