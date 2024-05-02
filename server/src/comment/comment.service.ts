import { Injectable } from '@nestjs/common';
import { CommentRepository } from './repository/comment.repository';
import { CreateCommentInput } from './inputs/create-comment.input';
import { CommentEntity } from '@prisma/client';
import { ActivityLogService } from '../activity-log/activity-log.service';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly activityLogService: ActivityLogService,
  ) {}
  async createComment(
    userId: number,
    postId: number,
    data: CreateCommentInput,
  ): Promise<CommentEntity> {
    return this.commentRepository.transaction(async () => {
      const post = await this.commentRepository.createComment({
        data: {
          ...data,
          userId,
          postId,
        },
      });
      await this.activityLogService.recordActivity(userId, postId, 'COMMENT');
      return post;
    });
  }

  async getPostComments(postId: number): Promise<CommentEntity[]> {
    return this.commentRepository.getComments({
      where: {
        postId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
