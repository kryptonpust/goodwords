// post.resolver.ts
import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PostEntity, UserEntity } from '@prisma/client';
import { User } from 'src/auth/decorators/user.decorator';
import { CommentService } from 'src/comment/comment.service';
import { UserModel } from 'src/user/models/user.model';
import { assertNotEmpty } from 'src/utils/util';
import { CommentModel } from '../comment/models/comment.model';
import { UserService } from '../user/user.service';
import { CreatePostInput } from './inputs/create-post.input';
import { UpdatePostInput } from './inputs/update-post.input';
import { PostModel } from './models/post.model';
import { PostService } from './post.service';

@Resolver(() => PostModel)
export class PostResolver {
  constructor(
    private readonly postService: PostService,
    private readonly userService: UserService,
    private readonly commentService: CommentService,
  ) {}

  @Query(() => [String], { name: 'categories' })
  async getCategories(): Promise<string[]> {
    return this.postService.getCategories();
  }

  @Query(() => [PostModel])
  async posts() {
    return this.postService.getPosts();
  }

  @Query(() => PostModel)
  async postById(@Args('id', { type: () => Int }) id: number) {
    return this.postService.getPostByIdWithIncrementedView(id);
  }

  @Mutation(() => PostModel)
  async createPost(
    @Args('createPostInputData') createPostInputData: CreatePostInput,
    @User() user: UserEntity,
  ) {
    return await this.postService.createPost(user.id, createPostInputData);
  }

  @Mutation(() => PostModel)
  async updatePost(
    @Args('postId', { type: () => Int }) postId: number,
    @Args('updatePostInputData') updatePostInputData: UpdatePostInput,
    @User() user: UserEntity,
  ) {
    assertNotEmpty(updatePostInputData);
    return this.postService.updatePost(user.id, postId, updatePostInputData);
  }

  @Mutation(() => PostModel)
  async deletePost(
    @Args('postId', { type: () => Int }) postId: number,
    @User() user: UserEntity,
  ) {
    return await this.postService.deletePost(user.id, postId);
  }

  @ResolveField('user', () => UserModel)
  async author(@Parent() post: PostEntity) {
    return this.userService.getUserById(post.userId);
  }

  @ResolveField('isMine', () => Boolean)
  async isMine(@Parent() post: PostEntity, @User() authUser: UserModel) {
    return post.userId === authUser.id;
  }

  @ResolveField('comments', () => [CommentModel])
  async comments(@Parent() post: PostEntity) {
    return this.commentService.getPostComments(post.id);
  }
  @ResolveField('views', () => Number)
  async views(@Parent() post: PostEntity) {
    return this.postService.countPostViews(post.id);
  }
}
