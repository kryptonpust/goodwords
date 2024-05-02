import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentResolver } from './comment.resolver';
import { CommentRepository } from './repository/comment.repository';
import { ActivityLogModule } from 'src/activity-log/activity-log.module';
import { PrismaModule } from '../database/prisma.module';

@Module({
  imports: [PrismaModule, ActivityLogModule],
  providers: [CommentResolver, CommentService, CommentRepository],
  exports: [CommentService],
})
export class CommentModule {}
