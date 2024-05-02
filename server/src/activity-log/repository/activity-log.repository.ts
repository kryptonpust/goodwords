import { Injectable } from '@nestjs/common';
import { ActivityLogEntity, Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class ActivityLogRepository {
  constructor(private prisma: PrismaService) {}

  async createActivityLogSync(params: {
    data: Prisma.ActivityLogEntityUncheckedCreateInput;
  }): Promise<ActivityLogEntity> {
    const { data } = params;
    return this.prisma.activityLogEntity.create({
      data,
    });
  }

  async getActivityLogs(params: {
    where?: Prisma.ActivityLogEntityWhereInput;
    orderBy?: Prisma.ActivityLogEntityOrderByWithRelationInput;
  }): Promise<ActivityLogEntity[]> {
    const { where, orderBy } = params;
    return this.prisma.activityLogEntity.findMany({
      where,
      orderBy,
    });
  }

  async getActivityLog(params: {
    cursor?: Prisma.ActivityLogEntityWhereUniqueInput;
  }): Promise<ActivityLogEntity> {
    const { cursor } = params;
    return this.prisma.activityLogEntity.findFirst({ cursor });
  }

  async countActivityLogs(params: {
    where?: Prisma.ActivityLogEntityWhereInput;
  }): Promise<number> {
    const { where } = params;
    return this.prisma.activityLogEntity.count({ where });
  }

  async removeActivityLog(params: {
    data: Prisma.ActivityLogEntityWhereUniqueInput;
  }): Promise<ActivityLogEntity> {
    const { data } = params;
    return this.prisma.activityLogEntity.delete({ where: data });
  }
}
