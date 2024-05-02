import { Field, InputType } from '@nestjs/graphql';
import { UserEntity } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsEmail } from 'class-validator';

@InputType()
export class CreateLoginInput {
  @Field(() => String)
  @IsEmail()
  @Type(() => String)
  email: UserEntity['email'];
  @Field()
  password: UserEntity['password'];
}
