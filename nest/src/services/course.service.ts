import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Courses, CourseType } from '../schemas/course.schema';
import { UserType } from 'src/schemas/user.schema';
import { UserService } from './user.service';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Courses.name) private courseModel: Model<Courses>,
    private userService: UserService,
  ) {}

  async findAll(): Promise<CourseType[]> {
    const data = await this.courseModel.find();

    const items = JSON.parse(JSON.stringify(data));

    //todo change type logic
    items.forEach((el: { rating: number[] | number }) => {
      if (Array.isArray(el.rating) && !el.rating.length) {
        el.rating = 0;
      }

      if (Array.isArray(el.rating) && el.rating.length) {
        el.rating =
          el.rating.reduce((acc: number, number: number) => acc + number, 0) /
          el.rating.length;
      }
    });

    return items;
  }

  async createOne(
    item: CourseType,
    userId: UserType['id'],
  ): Promise<CourseType> {
    const newItem = new this.courseModel(item);

    const res = await newItem.save();

    //@ts-expect-error type
    const user = await this.userService.updateOwnCoursesOne(userId, res._id);

    const data = JSON.parse(JSON.stringify(res));
    //@ts-expect-error type
    return { data, user };
  }

  async findOne(id: CourseType['id']): Promise<CourseType> {
    const data = await this.courseModel.findById(id);

    const item = JSON.parse(JSON.stringify(data));

    if (!item.rating.length) {
      item.rating = 0;
      return item;
    }

    item.rating =
      item.rating.reduce((acc: number, number: number) => acc + number, 0) /
      item.rating.length;
    return item;
  }

  async deleteOne(id: CourseType['id']): Promise<CourseType> {
    const data = await this.courseModel.findByIdAndDelete(id);

    return JSON.parse(JSON.stringify(data));
  }

  async updateOne(id: CourseType['id'], item: CourseType): Promise<CourseType> {
    const data = await this.courseModel.findByIdAndUpdate(id, item, {
      new: true,
    });

    return JSON.parse(JSON.stringify(data));
  }

  async updateRatingOne(
    id: CourseType['id'],
    item: number,
  ): Promise<CourseType> {
    const data = await this.courseModel.findByIdAndUpdate(
      id,
      { $push: { rating: item } },
      { new: true },
    );

    return JSON.parse(JSON.stringify(data));
  }

  async updateCommentOne(
    id: CourseType['id'],
    item: CourseType,
  ): Promise<CourseType> {
    const data = await this.courseModel.findByIdAndUpdate(
      id,
      { $push: { comments: item } },
      { new: true },
    );

    return JSON.parse(JSON.stringify(data));
  }
}
