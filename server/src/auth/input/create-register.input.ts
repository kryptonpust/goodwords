import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { Gender, UserEntity } from '@prisma/client';

registerEnumType(Gender, {
  name: 'Gender',
});

@InputType()
export class CreateRegisterInput {
  @Field()
  firstName: UserEntity['firstName'];
  @Field()
  lastName: UserEntity['lastName'];
  @Field()
  dateOfBirth: UserEntity['dateOfBirth'];
  @Field(() => Gender)
  gender: UserEntity['gender'];
  @Field()
  email: UserEntity['email'];
  @Field()
  password: UserEntity['password'];
}
