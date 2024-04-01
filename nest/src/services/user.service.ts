import { Injectable } from '@nestjs/common';
import { UsersEntity } from '../entities/user.entity';
import { UserModel, UserModelInput } from '../models/user.model';
import { CoursesEntity } from '../entities/course.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
  ) {}

  async findAll(): Promise<UsersEntity[]> {
    const data = await this.usersRepository.find();

    return JSON.parse(JSON.stringify(data));
  }

  async createOne(item: UserModel): Promise<UsersEntity> {
    const newItem = this.usersRepository.create(item);

    const data = await this.usersRepository.save(newItem);

    return JSON.parse(JSON.stringify(data));
  }

  async findOneById(id: string): Promise<UsersEntity> {
    const data = await this.usersRepository.findOneBy({
      id,
    });

    return JSON.parse(JSON.stringify(data));
  }

  async findOne(login: UsersEntity['login']): Promise<UsersEntity> {
    const data = await this.usersRepository.findOneBy({
      login,
    });

    return JSON.parse(JSON.stringify(data));
  }

  async deleteOne(id: UsersEntity['id']): Promise<UsersEntity> {
    const data = await this.usersRepository.delete({ id });

    return JSON.parse(JSON.stringify(data));
  }

  async updateOne(
    id: UsersEntity['id'],
    item: UserModelInput,
  ): Promise<UsersEntity> {
    const data = await this.usersRepository.update(id, item);

    return JSON.parse(JSON.stringify(data));
  }

  async updateOwnCoursesOne(
    id: UsersEntity['id'],
    item: CoursesEntity['id'],
  ): Promise<UsersEntity> {
    const foundedItem = await this.usersRepository.findOneBy({
      id,
    });

    if (foundedItem?.ownCourses?.indexOf(item) !== -1) {
      return;
    }

    foundedItem.ownCourses.push(item);

    const data = await this.usersRepository.update(id, foundedItem);

    return JSON.parse(JSON.stringify(data));
  }

  async updateAvailableCoursesOne(
    id: UsersEntity['id'],
    item: CoursesEntity['id'],
  ): Promise<UsersEntity> {
    const foundedItem = await this.usersRepository.findOneBy({
      id,
    });

    if (foundedItem?.availableCourses?.indexOf(item) !== -1) {
      return;
    }

    foundedItem.availableCourses.push(item);

    const data = await this.usersRepository.update(id, foundedItem);

    return JSON.parse(JSON.stringify(data));
  }
}
