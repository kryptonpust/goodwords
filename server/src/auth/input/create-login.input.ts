import { Field, InputType } from '@nestjs/graphql';
import { UserEntity } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsEmail } from 'class-validator';
// @JoiSchemaOptions({
//   allowUnknown: false,
//   abortEarly: true,
// })
@InputType()
export class CreateLoginInput {
  @Field(() => String)
  @IsEmail()
  @Type(() => String)
  email: UserEntity['email'];
  @Field()
  // @JoiSchema(Joi.string().required())
  password: UserEntity['password'];
}
