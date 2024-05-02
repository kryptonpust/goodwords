import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CommentModel {
  @Field(() => ID)
  id: number;
  @Field()
  comment: string;
  @Field()
  createdAt: Date;
}
