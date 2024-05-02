// user.model.ts
import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Gender, UserEntity } from '@prisma/client';

registerEnumType(Gender, {
  name: 'Gender',
});

@ObjectType()
export class UserModel {
  @Field(() => ID)
  id: UserEntity['id'];

  firstName: UserEntity['firstName'];

  lastName: UserEntity['lastName'];

  dateOfBirth: UserEntity['dateOfBirth'];

  @Field(() => Gender)
  gender: UserEntity['gender'];

  email: UserEntity['email'];

  createdAt: UserEntity['createdAt'];
}
