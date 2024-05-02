import { Injectable } from '@nestjs/common';
import { Prisma, ViewEntity } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { BaseRepository } from 'src/utils/base.repository';

@Injectable()
export class ViewRepository extends BaseRepository {
  constructor(readonly prisma: PrismaService) {
    super(prisma);
  }

  async createView(params: {
    data: Prisma.ViewEntityUserIdPostIdCompoundUniqueInput;
  }): Promise<ViewEntity> {
    const { data } = params;
    return this.prisma.viewEntity.upsert({
      where: { userId_postId: data },
      update: {
        count: {
          increment: 1,
        },
      },
      create: {
        userId: data.userId,
        postId: data.postId,
      },
    });
  }

  async getView(params: {
    cursor?: Prisma.ViewEntityWhereUniqueInput;
  }): Promise<ViewEntity> {
    const { cursor } = params;
    return this.prisma.viewEntity.findFirst({ cursor });
  }

  async countViews(params: {
    where?: Prisma.ViewEntityWhereInput;
  }): Promise<number> {
    const { where } = params;
    return (
      await this.prisma.viewEntity.aggregate({
        _sum: {
          count: true,
        },
        where,
      })
    )._sum.count;
  }

  async removeView(params: {
    data: Prisma.ViewEntityWhereUniqueInput;
  }): Promise<ViewEntity> {
    const { data } = params;
    return this.prisma.viewEntity.delete({ where: data });
  }
}
