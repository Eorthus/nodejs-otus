import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  CommentModelInput,
  CourseModel,
  CourseModelInput,
  RatingModelInput,
} from '../models/course.model';
import { CourseService } from '../services/course.service';
import { CoursesEntity } from '../entities/course.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Resolver(() => CourseModel)
export class CoursesResolver {
  constructor(private readonly courseService: CourseService) {}

  @Query(() => CourseModel)
  async course(@Args('id') id: string): Promise<CoursesEntity> {
    const item = await this.courseService.findOne(id);
    if (!item) {
      throw new NotFoundException(id);
    }
    return item;
  }

  @Query(() => [CourseModel])
  courses(): Promise<CoursesEntity[]> {
    const items = this.courseService.findAll();

    if (!items) {
      throw new NotFoundException();
    }
    return items;
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => CourseModel)
  async addCourse(
    @Args('form') form: CourseModelInput,
    @Args('userId') userId: string,
  ): Promise<CoursesEntity> {
    const item = await this.courseService.createOne(form, userId);

    return item;
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => CourseModel)
  async removeCourse(@Args('id') id: string): Promise<CoursesEntity> {
    return this.courseService.deleteOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => CourseModel)
  async updateCourse(
    @Args('id') id: string,
    @Args('form') form: CourseModelInput,
  ): Promise<CoursesEntity> {
    const item = await this.courseService.updateOne(id, form);

    if (!item) {
      throw new NotFoundException(id);
    }

    return item;
  }

  @Mutation(() => CourseModel)
  async updateRatingCourse(
    @Args('id') id: string,
    @Args('form') form: RatingModelInput,
  ): Promise<CoursesEntity> {
    const item = await this.courseService.updateRatingOne(id, form.rating);

    if (!item) {
      throw new NotFoundException(id);
    }

    return item;
  }

  @Mutation(() => CourseModel)
  async updateCommentCourse(
    @Args('id') id: string,
    @Args('form') form: CommentModelInput,
  ): Promise<CoursesEntity> {
    const item = await this.courseService.updateCommentOne(id, form);

    if (!item) {
      throw new NotFoundException(id);
    }

    return item;
  }
}
