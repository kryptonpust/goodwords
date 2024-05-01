import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UserWithTokenModel } from './models/user-with-token.model';
import { CreateLoginInput } from './input/create-login.input';
import { User } from './decorators/user.decorator';
import { UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserEntity } from '@prisma/client';
import { CreateRegisterInput } from './input/create-register.input';
import { SkipJWT } from './decorators/skip-jwt.decorator';

@Resolver(() => UserWithTokenModel)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @SkipJWT()
  @UseGuards(LocalAuthGuard)
  @Mutation(() => UserWithTokenModel, { name: 'login' })
  async login(
    @Args('createLoginData')
    createLoginData: CreateLoginInput,
    @User() user: UserEntity,
  ) {
    return this.authService.login(user);
  }

  @SkipJWT()
  @Mutation(() => UserWithTokenModel, { name: 'register' })
  async register(
    @Args('createRegisterInput')
    createRegisterInput: CreateRegisterInput,
  ) {
    return this.authService.register(createRegisterInput);
  }
}
