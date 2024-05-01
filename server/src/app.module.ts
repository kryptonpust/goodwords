import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/prisma.module';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
