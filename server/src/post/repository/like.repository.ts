import { Injectable } from '@nestjs/common';
import { LikeEntity, Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { BaseRepository } from 'src/utils/base.repository';

@Injectable()
export class LikeRepository extends BaseRepository {
  constructor(prisma: PrismaService) {
    super(prisma);
  }

  async createLike(params: { data: Prisma.LikeEntityUncheckedCreateInput }) {
    const { data } = params;
    return this.prisma.likeEntity.create({
      data,
    });
  }

  async getLike(params: {
    cursor?: Prisma.LikeEntityWhereUniqueInput;
  }): Promise<LikeEntity> {
    const { cursor } = params;
    return this.prisma.likeEntity.findFirst({ cursor });
  }

  async countLikes(params: {
    where?: Prisma.LikeEntityWhereInput;
  }): Promise<number> {
    const { where } = params;
    return this.prisma.likeEntity.count({ where });
  }

  async removeLike(params: {
    data: Prisma.LikeEntityWhereUniqueInput;
  }): Promise<LikeEntity> {
    const { data } = params;
    return this.prisma.likeEntity.delete({ where: data });
  }
}
