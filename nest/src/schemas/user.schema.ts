import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';
import { Role } from 'src/auth/roles.decorator';

export type UserType = HydratedDocument<Users>;

export type RolesType = HydratedDocument<Roles>;

@Schema()
export class Roles {
  @Prop()
  title: string;

  @Prop()
  name: Role;
}

export const RolesSchema = SchemaFactory.createForClass(Roles);

@Schema()
export class Users {
  @Prop({ required: true })
  login: string;

  @Prop({ required: true })
  password: string;
  @Prop()
  refreshToken: string;

  @Prop()
  roles?: Roles[];

  @Prop()
  ownCourses?: ObjectId[];

  @Prop()
  availableCourses?: ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(Users);
