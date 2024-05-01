// user.model.ts
import { Field, ObjectType } from '@nestjs/graphql';
import { UserModel } from 'src/user/models/user.model';

@ObjectType()
export class UserWithTokenModel {
  @Field(() => UserModel)
  user: UserModel;
  @Field()
  token: string;
}
