import { Injectable } from '@nestjs/common';
import { ActivityLogRepository } from './repository/activity-log.repository';
import { ActivityType, PostEntity, UserEntity } from '@prisma/client';

@Injectable()
export class ActivityLogService {
  constructor(private readonly activityLogRepository: ActivityLogRepository) {}

  async recordActivity(
    userId: UserEntity['id'],
    postId: PostEntity['id'],
    activity: ActivityType,
  ) {
    return this.activityLogRepository.createActivityLogSync({
      data: {
        userId,
        postId,
        activity,
      },
    });
  }

  getActivityLogs(userId: UserEntity['id'], activity?: ActivityType) {
    return this.activityLogRepository.getActivityLogs({
      where: { userId, activity },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
