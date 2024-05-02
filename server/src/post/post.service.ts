// post.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PostEntity, UserEntity } from '@prisma/client';
import { ActivityLogService } from 'src/activity-log/activity-log.service';
import { PrismaService } from 'src/database/prisma.service';
import { CommentRepository } from '../comment/repository/comment.repository';
import { CreatePostInput } from './inputs/create-post.input';
import { UpdatePostInput } from './inputs/update-post.input';
import { LikeRepository } from './repository/like.repository';
import { PostRepository } from './repository/post.repository';
import { ViewRepository } from './repository/view.repository';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly likeRepository: LikeRepository,
    private readonly commentRepository: CommentRepository,
    private readonly viewRepository: ViewRepository,
    private readonly activityLogService: ActivityLogService,
    private readonly prisma: PrismaService,
  ) {}

  getCategories() {
    return [
      'TECHNOLOGY',
      'TRAVEL',
      'FOOD',
      'LIFESTYLE',
      'FASHION',
      'ENTERTAINMENT',
      'DIY',
      'BUSINESS',
      'SPORTS',
    ];
  }

  async createPost(
    userId: UserEntity['id'],
    data: CreatePostInput,
  ): Promise<PostEntity> {
    return this.postRepository.transaction(async () => {
      const post = await this.postRepository.createPost({
        data: {
          ...data,
          userId,
        },
      });
      await this.activityLogService.recordActivity(userId, post.id, 'CREATE');
      return post;
    });
  }

  updatePost(
    userId: UserEntity['id'],
    postId: PostEntity['id'],
    updatePostInputData: UpdatePostInput,
  ) {
    return this.postRepository.updatePost({
      where: {
        id: postId,
        userId,
      },
      data: {
        ...updatePostInputData,
      },
    });
  }

  async getPostById(id: number): Promise<PostEntity> {
    const result = await this.postRepository.getPost({
      where: {
        id,
      },
    });
    if (!result) {
      throw new NotFoundException('Post not found');
    }
    await this.viewRepository.createView({
      data: {
        userId: result.userId,
        postId: result.id,
      },
    });
    return result;
  }

  async getPosts(): Promise<PostEntity[]> {
    return this.prisma.postEntity.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async deletePost(userId: number, postId: number): Promise<PostEntity> {
    return this.postRepository.deletePost({
      where: {
        id: postId,
        userId,
      },
    });
  }

  // async getPostById(id: number): Promise<PostEntity> {
  //   return this.prisma.postEntity.findUnique({
  //     where: { id },
  //   });
  // }

  async getPostsByAuthorId(userId: number): Promise<PostEntity[]> {
    return this.prisma.postEntity.findMany({
      where: { userId },
    });
  }

  async togglePostLike(userId: number, postId: number): Promise<PostEntity> {
    const post = await this.prisma.postEntity.findUnique({
      where: { id: postId },
    });

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

  countPostViews(id: number) {
    return this.viewRepository.countViews({
      where: {
        postId: id,
      },
    });
  }
}
