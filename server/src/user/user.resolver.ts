// user.resolver.ts
import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UserModel } from './models/user.model';
import { UserService } from './user.service';

@Resolver(() => UserModel)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => UserModel)
  async user(@Args('id', { type: () => Int }) id: number) {
    return this.userService.getUserById(id);
  }

  @ResolveField('fullName', () => String)
  async fullName(@Parent() user: UserModel) {
    return `${user.firstName} ${user.lastName}`;
  }
}
