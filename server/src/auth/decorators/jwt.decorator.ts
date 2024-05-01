import {
  BadRequestException,
  ExecutionContext,
  createParamDecorator,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const Jwt = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = GqlExecutionContext.create(ctx).getContext().req;
    const payload = request.user.jwt;
    if (!payload) {
      throw new BadRequestException("Can't find jwt payload");
    }
    return data ? payload?.[data] : payload;
  },
);
