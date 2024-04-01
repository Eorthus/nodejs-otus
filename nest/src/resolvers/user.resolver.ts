import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserModel, UserModelInput } from '../models/user.model';
import { UserService } from '../services/user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { HasRoles, Role } from '../auth/roles.decorator';
import { UsersEntity } from '../entities/user.entity';

@Resolver(() => UserModel)
export class UsersResolver {
  constructor(private readonly userService: UserService) {}

  @HasRoles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Query(() => UserModel)
  async user(@Args('id') id: string): Promise<UsersEntity> {
    const item = await this.userService.findOneById(id);
    if (!item) {
      throw new NotFoundException(id);
    }
    return item;
  }

  @HasRoles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Query(() => [UserModel])
  users(): Promise<UsersEntity[]> {
    const items = this.userService.findAll();

    if (!items) {
      throw new NotFoundException();
    }
    return items;
  }

  @HasRoles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation(() => UserModel)
  async updateUser(
    @Args('id') id: string,
    @Args('form') form: UserModelInput,
  ): Promise<UsersEntity> {
    const item = await this.userService.updateOne(id, form);

    if (!item) {
      throw new NotFoundException(id);
    }

    return item;
  }

  @HasRoles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation(() => UserModel)
  async updateUserAvailableCourses(
    @Args('id') id: string,
    @Args('courseId') courseId: string,
  ): Promise<UsersEntity> {
    const item = await this.userService.updateAvailableCoursesOne(id, courseId);

    if (!item) {
      throw new NotFoundException(id);
    }

    return item;
  }
}
