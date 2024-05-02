import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { LikeService } from './like.service';
import { PostEntity, UserEntity } from '@prisma/client';
import { User } from 'src/auth/decorators/user.decorator';
import { PostModel } from 'src/post/models/post.model';

@Resolver(() => PostModel)
export class LikeResolver {
  constructor(private readonly likeService: LikeService) {}

  @Mutation(() => PostModel)
  async toggleLike(@Args('postId') postId: number, @User() user: UserEntity) {
    return await this.likeService.togglePostLike(user.id, postId);
  }

  @ResolveField('likes', () => Number)
  async likes(@Parent() post: PostEntity) {
    return this.likeService.countPostLikes(post.id);
  }

  @ResolveField('isLiked', () => Boolean)
  async isLiked(@Parent() post: PostEntity, @User() user: UserEntity) {
    return this.likeService.isLiked(user.id, post.id);
  }
}
