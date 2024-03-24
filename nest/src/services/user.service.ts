import { Injectable } from '@nestjs/common';
import { Users } from '../entities/user.entity';
import { Courses } from '../entities/course.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async findAll(): Promise<Users[]> {
    const data = await this.usersRepository.find();

    return JSON.parse(JSON.stringify(data));
  }

  async createOne(item: Users): Promise<Users> {
    const newItem = this.usersRepository.create(item);

    const data = await this.usersRepository.save(newItem);

    return JSON.parse(JSON.stringify(data));
  }

  async findOneById(id: Users['id']): Promise<Users> {
    const data = await this.usersRepository.findOneBy({
      id,
    });

    return JSON.parse(JSON.stringify(data));
  }

  async findOne(login: Users['login']): Promise<Users> {
    const data = await this.usersRepository.findOneBy({
      login,
    });

    return JSON.parse(JSON.stringify(data));
  }

  async deleteOne(id: Users['id']): Promise<Users> {
    const data = await this.usersRepository.delete({ id });

    return JSON.parse(JSON.stringify(data));
  }

  async updateOne(id: Users['id'], item: Users): Promise<Users> {
    const data = await this.usersRepository.update(id, item);

    return JSON.parse(JSON.stringify(data));
  }

  async updateOwnCoursesOne(
    id: Users['id'],
    item: Courses['id'],
  ): Promise<Users> {
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
    id: Users['id'],
    item: Courses['id'],
  ): Promise<Users> {
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
