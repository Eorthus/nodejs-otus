import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { Role } from '../auth/roles.decorator';

@ObjectType({ description: 'token' })
export class TokenModel {
  @Field()
  access_token: string;
}

@ObjectType({ description: 'roles' })
export class RolesModel {
  @Field(() => ID)
  id: number;

  @Field()
  title: string;

  @Field()
  name: Role;
}

@ObjectType({ description: 'user' })
export class UserModel {
  @Field(() => ID)
  id: string;

  @Field()
  login: string;

  @Field(() => [RolesModel], { nullable: true })
  roles: RolesModel[];

  @Field(() => [String], { nullable: true })
  ownCourses: string[];

  @Field(() => [String], { nullable: true })
  availableCourses: string[];
}

@InputType({ description: 'rolesInput' })
export class RolesModelInput {
  @Field()
  title: string;

  @Field()
  name: Role;
}

@InputType({ description: 'userInput' })
export class UserModelInput {
  @Field()
  login: string;

  @Field()
  password: string;

  @Field({ nullable: true })
  refreshToken: string;

  @Field(() => [RolesModelInput], { nullable: true })
  roles: RolesModelInput[];

  @Field(() => [String], { nullable: true })
  ownCourses: string[];

  @Field(() => [String], { nullable: true })
  availableCourses: string[];
}
