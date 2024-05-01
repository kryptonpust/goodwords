import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { EnvConfig } from 'src/env-config/env-config';
import { AuthService } from '../auth.service';
import { jwtPayload } from 'types/jwt-payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    readonly envConfig: EnvConfig,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: envConfig.JWT_SECRET,
    });
  }

  async validate(payload: jwtPayload) {
    const user = await this.authService.attachUser(payload);
    if (!user) {
      throw new UnauthorizedException();
    }
    return { user: user, jwt: payload };
  }
}
