import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { SKIP_JWT_KEY } from '../decorators/skip-jwt.decorator';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }
  canActivate(context: ExecutionContext) {
    const skipJWT = this.reflector.getAllAndOverride<boolean>(SKIP_JWT_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (skipJWT) {
      return true;
    }
    return super.canActivate(context);
  }

  getRequest(context: ExecutionContext): Request {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
