import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { ActivityLogEntity, ActivityType } from '@prisma/client';

registerEnumType(ActivityType, {
  name: 'ActivityType',
});

@ObjectType()
export class ActivityLog {
  @Field()
  id: ActivityLogEntity['id'];
  userId: ActivityLogEntity['userId'];
  postId: ActivityLogEntity['postId'];
  @Field(() => ActivityType)
  activity: ActivityLogEntity['activity'];
  @Field()
  createdAt: ActivityLogEntity['createdAt'];
}
