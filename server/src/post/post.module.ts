import { Module, forwardRef } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { PostResolver } from './post.resolver';
import { PostService } from './post.service';
import { PostRepository } from './repository/post.repository';
import { LikeRepository } from './repository/like.repository';
import { CommentRepository } from '../comment/repository/comment.repository';
import { ViewRepository } from './repository/view.repository';
import { ActivityLogModule } from 'src/activity-log/activity-log.module';
import { PrismaModule } from 'src/database/prisma.module';
import { CommentModule } from 'src/comment/comment.module';

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => UserModule),
    ActivityLogModule,
    CommentModule,
  ],
  providers: [
    PostResolver,
    PostService,
    PostRepository,
    LikeRepository,
    CommentRepository,
    ViewRepository,
  ],
  exports: [PostService],
})
export class PostModule {}
