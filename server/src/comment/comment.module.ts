import { Module, forwardRef } from '@nestjs/common';
import { ActivityLogModule } from 'src/activity-log/activity-log.module';
import { PrismaModule } from '../database/prisma.module';
import { CommentResolver } from './comment.resolver';
import { CommentService } from './comment.service';
import { CommentRepository } from './repository/comment.repository';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [PrismaModule, ActivityLogModule, forwardRef(() => UserModule)],
  providers: [CommentResolver, CommentService, CommentRepository],
  exports: [CommentService],
})
export class CommentModule {}
