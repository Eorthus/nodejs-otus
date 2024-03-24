import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from '../services/user.service';
import { Users } from '../entities/user.entity';
import { userId } from './auth.controller.spec';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbTestModule } from './auth.controller.spec';

describe('UserController', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let userController: UserController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [dbTestModule, TypeOrmModule.forFeature([Users])],
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    userController = app.get<UserController>(UserController);
  });

  describe('users', () => {
    it('findAll', async () => {
      const res = await userController.findAll();
      expect(Array.isArray(res)).toBeTruthy();
    });

    it('findOne', async () => {
      const res = await userController.findOne(userId);
      expect(res).toBeTruthy();
    });

    it('patchOne', async () => {
      //@ts-expect-error type
      const res = await userController.patchOne(userId, { login: 'admin' });
      expect(res).toBeTruthy();
    });

    // it('patchAvailableCourses', async () => {
    //   const res = await userController.patchOneAvailableCourses(userId, {
    //     id: '65a6884c14393c319e7526b7',
    //   });
    //   expect(res).toBeTruthy();
    // });
  });
});
