import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<unknown> {
    try {
      const user = await this.authService.validateUser(email, password);
      return { user: user };
    } catch (e) {
      if (e instanceof HttpException) throw e;
      throw new UnauthorizedException(e);
    }
  }
}
