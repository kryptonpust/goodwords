import { Injectable } from '@nestjs/common';
import { CommentEntity, Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { BaseRepository } from 'src/utils/base.repository';

@Injectable()
export class CommentRepository extends BaseRepository {
  constructor(prisma: PrismaService) {
    super(prisma);
  }

  async createComment(params: {
    data: Prisma.CommentEntityUncheckedCreateInput;
  }): Promise<CommentEntity> {
    const { data } = params;
    return this.prisma.commentEntity.create({
      data,
    });
  }

  async getComments(params: {
    where?: Prisma.CommentEntityWhereInput;
    orderBy?: Prisma.CommentEntityOrderByWithRelationInput;
  }): Promise<CommentEntity[]> {
    const { where, orderBy } = params;
    return this.prisma.commentEntity.findMany({ where, orderBy });
  }

  async countComments(params: {
    where?: Prisma.CommentEntityWhereInput;
  }): Promise<number> {
    const { where } = params;
    return this.prisma.commentEntity.count({ where });
  }
}
