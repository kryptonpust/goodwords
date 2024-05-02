// post.model.ts
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserModel } from 'src/user/models/user.model';

@ObjectType()
export class PostModel {
  @Field(() => ID)
  id: number;

  @Field()
  title: string;

  @Field()
  content: string;

  @Field(() => UserModel, { complexity: 50 })
  user: UserModel;

  @Field(() => [String])
  categories: string[];

  @Field()
  createdAt: Date;
}
