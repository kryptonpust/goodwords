// post.model.ts
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserModel } from 'src/user/models/user.model';

@ObjectType()
export class Post {
  @Field(() => ID)
  id: number;

  @Field()
  title: string;

  @Field()
  content: string;

  @Field(() => UserModel, { complexity: 50 })
  user: UserModel;
  // userId: number;

  @Field(() => [String])
  categories: string[];

  @Field()
  createdAt: Date;
}
