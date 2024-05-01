import {
  BadRequestException,
  ExecutionContext,
  createParamDecorator,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = GqlExecutionContext.create(ctx).getContext().req;
    const user = request.user.user;
    if (!user) {
      throw new BadRequestException();
    }
    return data ? user?.[data] : user;
  },
);
