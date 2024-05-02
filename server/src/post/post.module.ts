import { Module, forwardRef } from '@nestjs/common';
import { ActivityLogModule } from 'src/activity-log/activity-log.module';
import { CommentModule } from 'src/comment/comment.module';
import { PrismaModule } from 'src/database/prisma.module';
import { UserModule } from 'src/user/user.module';
import { PostResolver } from './post.resolver';
import { PostService } from './post.service';
import { PostRepository } from './repository/post.repository';
import { ViewRepository } from './repository/view.repository';
import { LikeModule } from 'src/like/like.module';

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => UserModule),
    ActivityLogModule,
    CommentModule,
    LikeModule,
  ],
  providers: [PostResolver, PostService, PostRepository, ViewRepository],
  exports: [PostService],
})
export class PostModule {}
