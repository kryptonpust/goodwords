import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePostInput {
  @Field()
  content: string;
  @Field(() => [String])
  categories: string[];
}
