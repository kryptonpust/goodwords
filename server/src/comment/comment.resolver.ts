import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CommentService } from './comment.service';
import { UserEntity } from '@prisma/client';
import { User } from 'src/auth/decorators/user.decorator';
import { CreateCommentInput } from './inputs/create-comment.input';
import { CommentModel } from './models/comment.model';

@Resolver()
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @Mutation(() => CommentModel)
  async createComment(
    @Args('postId') postId: number,
    @Args('createCommentInputData') createCommentInputData: CreateCommentInput,
    @User() user: UserEntity,
  ) {
    return this.commentService.createComment(
      user.id,
      postId,
      createCommentInputData,
    );
  }
}
