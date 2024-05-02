import { Module, forwardRef } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeResolver } from './like.resolver';
import { PrismaModule } from 'src/database/prisma.module';
import { LikeRepository } from 'src/post/repository/like.repository';
import { PostModule } from 'src/post/post.module';
import { ActivityLogModule } from 'src/activity-log/activity-log.module';

@Module({
  imports: [PrismaModule, forwardRef(() => PostModule), ActivityLogModule],
  providers: [LikeResolver, LikeService, LikeRepository],
})
export class LikeModule {}
