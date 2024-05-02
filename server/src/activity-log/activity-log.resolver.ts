import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ActivityType, UserEntity } from '@prisma/client';
import { User } from 'src/auth/decorators/user.decorator';
import { Post } from 'src/post/models/post.model';
import { PostService } from '../post/post.service';
import { UserService } from '../user/user.service';
import { ActivityLogService } from './activity-log.service';
import { ActivityLog } from './model/activityLog.model';
import { UserModel } from 'src/user/models/user.model';

@Resolver(() => ActivityLog)
export class ActivityLogResolver {
  constructor(
    private readonly activityLogService: ActivityLogService,
    private readonly postService: PostService,
    private readonly userService: UserService,
  ) {}

  @Query(() => [ActivityLog])
  async getActivityLogs(
    @User() user: UserEntity,
    @Args('activity', { type: () => ActivityType, nullable: true })
    activity?: ActivityLog['activity'],
  ): Promise<ActivityLog[]> {
    return this.activityLogService.getActivityLogs(user.id, activity);
  }

  @ResolveField('post', () => Post)
  async post(@Parent() activityLog: ActivityLog) {
    return this.postService.getPostById(activityLog.postId);
  }

  @ResolveField('user', () => UserModel)
  async user(@Parent() activityLog: ActivityLog) {
    return this.userService.getUserById(activityLog.userId);
  }
}
