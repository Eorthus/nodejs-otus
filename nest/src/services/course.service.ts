import { Injectable } from '@nestjs/common';
import { CoursesEntity } from '../entities/course.entity';
import { CourseModelInput, CommentModelInput } from '../models/course.model';
import { UserService } from './user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from '../entities/user.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(CoursesEntity)
    private readonly coursesRepository: Repository<CoursesEntity>,
    private userService: UserService,
  ) {}

  async findAll(): Promise<CoursesEntity[]> {
    const data = await this.coursesRepository.find();
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
    item: CourseModelInput,
    userId: UsersEntity['id'],
  ): Promise<CoursesEntity> {
    const newItem = this.coursesRepository.create(item);

    const res = await this.coursesRepository.save(newItem);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const user = await this.userService.updateOwnCoursesOne(userId, res.id);

    const data = JSON.parse(JSON.stringify(res));
    //@ts-expect-error type
    return { data, user };
  }

  async findOne(id: string): Promise<CoursesEntity> {
    const data = await this.coursesRepository.findOneBy({
      id,
    });

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

  async deleteOne(id: string): Promise<CoursesEntity> {
    const data = await this.coursesRepository.delete({ id });

    return JSON.parse(JSON.stringify(data));
  }

  async updateOne(id: string, item: CourseModelInput): Promise<CoursesEntity> {
    const data = await this.coursesRepository.update(id, item);

    return JSON.parse(JSON.stringify(data));
  }

  async updateRatingOne(id: string, item: number): Promise<CoursesEntity> {
    const foundedItem = await this.coursesRepository.findOneBy({
      id,
    });

    foundedItem.rating.push(item);

    const data = await this.coursesRepository.update(id, foundedItem);

    return JSON.parse(JSON.stringify(data));
  }

  async updateCommentOne(
    id: string,
    item: CommentModelInput,
  ): Promise<CoursesEntity> {
    const foundedItem = await this.coursesRepository.findOneBy({
      id,
    });

    if (!foundedItem.comments?.length) {
      foundedItem.comments = [];
    }
    //@ts-expect-error type
    foundedItem.comments.push(item);

    const data = await this.coursesRepository.save(foundedItem);

    return JSON.parse(JSON.stringify(data));
  }
}
