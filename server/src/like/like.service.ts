import { Injectable } from '@nestjs/common';
import { PostEntity } from '@prisma/client';
import { ActivityLogService } from 'src/activity-log/activity-log.service';
import { PostService } from 'src/post/post.service';
import { LikeRepository } from 'src/post/repository/like.repository';

@Injectable()
export class LikeService {
  constructor(
    private readonly likeRepository: LikeRepository,
    private readonly postService: PostService,
    private readonly activityLogService: ActivityLogService,
  ) {}

  async togglePostLike(userId: number, postId: number): Promise<PostEntity> {
    const post = await this.postService.getPostById(postId);

    if (!post) {
      throw new Error('Post not found');
    }

    const like = await this.likeRepository.getLike({
      cursor: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });

    if (like) {
      await this.likeRepository.removeLike({
        data: {
          id: like.id,
        },
      });
    } else {
      await this.likeRepository.transaction(async () => {
        await this.activityLogService.recordActivity(userId, postId, 'LIKE');
        await this.likeRepository.createLike({
          data: {
            userId,
            postId,
          },
        });
      });
    }

    return post;
  }

  async countPostLikes(postId: number): Promise<number> {
    return this.likeRepository.countLikes({
      where: {
        postId,
      },
    });
  }

  async isLiked(userId: number, postId: number): Promise<boolean> {
    const like = await this.likeRepository.getLike({
      cursor: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });

    return !!like;
  }
}
