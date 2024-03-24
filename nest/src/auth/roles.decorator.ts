import { SetMetadata } from '@nestjs/common';

export enum Role {
  User = 'user',
  Admin = 'admin',
  Author = 'author',
}
export const HasRoles = (...roles: Role[]) => SetMetadata('roles', roles);
