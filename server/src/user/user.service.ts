// user.service.ts
import { Injectable } from '@nestjs/common';
import { Prisma, UserEntity } from '@prisma/client';
import { hash } from 'bcrypt';
import { PrismaService } from 'src/database/prisma.service';
import { EnvConfig } from '../env-config/env-config';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly envConfig: EnvConfig,
  ) {}

  async createUser(data: Prisma.UserEntityCreateInput): Promise<UserEntity> {
    const { password, ...rest } = data;
    const hashedPassword = await hash(password, this.envConfig.SALT_ROUNDS);
    return this.prisma.userEntity.create({
      data: {
        ...rest,
        password: hashedPassword,
      },
    });
  }

  async getUsers(): Promise<UserEntity[]> {
    return this.prisma.userEntity.findMany();
  }

  async getUserById(id: number): Promise<UserEntity> {
    return this.prisma.userEntity.findUnique({
      where: { id },
    });
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    return this.prisma.userEntity.findUnique({
      where: { email },
    });
  }
}
