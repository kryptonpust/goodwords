import { Prisma, PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

export abstract class BaseRepository {
  constructor(protected readonly prisma: PrismaService) {}

  async transactionSync<T extends Prisma.PrismaPromise<any>[]>(args: [...T]) {
    return this.prisma.$transaction<T>(args);
  }

  async transaction<T>(fn: (prisma: PrismaClient) => Promise<T>) {
    return this.prisma.$transaction(fn);
  }
}
