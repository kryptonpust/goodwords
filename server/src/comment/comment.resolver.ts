import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CommentService } from './comment.service';
import { CommentEntity, UserEntity } from '@prisma/client';
import { User } from 'src/auth/decorators/user.decorator';
import { CreateCommentInput } from './inputs/create-comment.input';
import { CommentModel } from './models/comment.model';
import { UserModel } from 'src/user/models/user.model';
import { UserService } from 'src/user/user.service';

@Resolver(() => CommentModel)
export class CommentResolver {
  constructor(
    private readonly commentService: CommentService,
    private readonly userService: UserService,
  ) {}

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

  @ResolveField('user', () => UserModel)
  async user(@Parent() comment: CommentEntity) {
    return this.userService.getUserById(comment.userId);
  }

  @ResolveField('isMine', () => Boolean)
  async isMine(@Parent() comment: CommentEntity, @User() user: UserEntity) {
    return comment.userId === user.id;
  }
}
