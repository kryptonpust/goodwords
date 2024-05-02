// post.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PostEntity, UserEntity } from '@prisma/client';
import { ActivityLogService } from 'src/activity-log/activity-log.service';
import { PrismaService } from 'src/database/prisma.service';
import { CreatePostInput } from './inputs/create-post.input';
import { UpdatePostInput } from './inputs/update-post.input';
import { PostRepository } from './repository/post.repository';
import { ViewRepository } from './repository/view.repository';
import { POST_TYPES } from 'src/utils/constants';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly viewRepository: ViewRepository,
    private readonly activityLogService: ActivityLogService,
    private readonly prisma: PrismaService,
  ) {}

  getCategories() {
    return POST_TYPES;
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

  async getPostByIdWithIncrementedView(id: number): Promise<PostEntity> {
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

  async getPostById(id: number): Promise<PostEntity> {
    return this.prisma.postEntity.findUnique({
      where: { id },
    });
  }

  async getPostsByUserId(userId: number): Promise<PostEntity[]> {
    return this.prisma.postEntity.findMany({
      where: { userId },
    });
  }

  countPostViews(id: number) {
    return this.viewRepository.countViews({
      where: {
        postId: id,
      },
    });
  }
}
