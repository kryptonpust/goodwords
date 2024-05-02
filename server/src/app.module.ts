import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { EnvConfigModule } from './env-config/env-config.module';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';
import { ComplexityPlugin } from './utils/ComplexityPlugin';
import { PrismaClientExceptionFilter } from './database/filters/prisma-execption.filter';

@Module({
  imports: [
    EnvConfigModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req, res }) => ({ req, res }),
    }),
    UserModule,
    PostModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    ComplexityPlugin,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_FILTER,
      useClass: PrismaClientExceptionFilter,
    },
  ],
  exports: [],
})
export class AppModule {}
