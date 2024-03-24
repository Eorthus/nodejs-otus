import { Model, ObjectId } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Users, UserType } from '../schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(Users.name) private userModel: Model<Users>) {}

  async findAll(): Promise<UserType[]> {
    const data = await this.userModel.find();

    return JSON.parse(JSON.stringify(data));
  }

  async createOne(item: UserType): Promise<UserType> {
    const newItem = new this.userModel(item);

    const data = await newItem.save();

    return JSON.parse(JSON.stringify(data));
  }

  async findOneById(id: UserType['id']): Promise<UserType> {
    const data = await this.userModel.findById(id);

    return JSON.parse(JSON.stringify(data));
  }

  async findOne(login: UserType['login']): Promise<UserType> {
    const data = await this.userModel.findOne({ login });

    return JSON.parse(JSON.stringify(data));
  }

  async deleteOne(id: UserType['id']): Promise<UserType> {
    const data = await this.userModel.findByIdAndDelete(id);

    return JSON.parse(JSON.stringify(data));
  }

  async updateOne(id: UserType['id'], item: UserType): Promise<UserType> {
    const data = await this.userModel.findByIdAndUpdate(id, item, {
      new: true,
    });

    return JSON.parse(JSON.stringify(data));
  }

  async updateOwnCoursesOne(
    id: UserType['id'],
    item: ObjectId,
  ): Promise<UserType> {
    const user = await this.userModel.findById(id);

    if (user?.ownCourses?.indexOf(item) !== -1) {
      const data = await this.userModel.findByIdAndUpdate(
        id,
        { $pull: { ownCourses: item } },
        { new: true },
      );
      return JSON.parse(JSON.stringify(data));
    }
    const data = await this.userModel.findByIdAndUpdate(
      id,
      { $push: { ownCourses: item } },
      { new: true },
    );
    return JSON.parse(JSON.stringify(data));
  }

  async updateAvailableCoursesOne(
    id: UserType['id'],
    item: ObjectId,
  ): Promise<UserType> {
    const user = await this.userModel.findById(id);

    if (user?.availableCourses?.indexOf(item) !== -1) {
      const data = await this.userModel.findByIdAndUpdate(
        id,
        { $pull: { availableCourses: item } },
        { new: true },
      );
      return JSON.parse(JSON.stringify(data));
    }

    const data = await this.userModel.findByIdAndUpdate(
      id,
      { $push: { availableCourses: item } },
      { new: true },
    );
    return JSON.parse(JSON.stringify(data));
  }
}
