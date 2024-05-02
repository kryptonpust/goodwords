import { Injectable } from '@nestjs/common';
import { PostEntity, Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { BaseRepository } from 'src/utils/base.repository';

@Injectable()
export class PostRepository extends BaseRepository {
  constructor(prisma: PrismaService) {
    super(prisma);
  }

  createPost(params: { data: Prisma.PostEntityUncheckedCreateInput }) {
    const { data } = params;
    return this.prisma.postEntity.create({ data });
  }

  async getPost(params: {
    where?: Prisma.PostEntityWhereInput;
  }): Promise<PostEntity> {
    const { where } = params;
    return this.prisma.postEntity.findFirst({ where });
  }

  async getPosts(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PostEntityWhereUniqueInput;
    where?: Prisma.PostEntityWhereInput;
    orderBy?: Prisma.PostEntityOrderByWithRelationInput;
  }): Promise<PostEntity[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.postEntity.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async updatePost(params: {
    where: Prisma.PostEntityWhereUniqueInput;
    data: Prisma.PostEntityUpdateInput;
  }): Promise<PostEntity> {
    const { where, data } = params;
    return this.prisma.postEntity.update({ where, data });
  }

  async deletePost(params: {
    where: Prisma.PostEntityWhereUniqueInput;
  }): Promise<PostEntity> {
    const { where } = params;
    return this.prisma.postEntity.delete({ where });
  }
}
