import { Module, forwardRef } from '@nestjs/common';
import { ActivityLogService } from './activity-log.service';
import { ActivityLogResolver } from './activity-log.resolver';
import { ActivityLogRepository } from './repository/activity-log.repository';
import { PostModule } from 'src/post/post.module';
import { UserModule } from 'src/user/user.module';
import { PrismaModule } from 'src/database/prisma.module';

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => PostModule),
    forwardRef(() => UserModule),
  ],
  providers: [ActivityLogResolver, ActivityLogService, ActivityLogRepository],
  exports: [ActivityLogService],
})
export class ActivityLogModule {}
