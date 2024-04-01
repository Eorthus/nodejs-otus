import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../services/user.service';
import { UsersEntity } from '../entities/user.entity';
import { userId } from './auth.resolver.spec';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbTestModule } from './auth.resolver.spec';
import { UsersResolver } from './user.resolver';

describe('usersResolver', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let usersResolver: UsersResolver;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [dbTestModule, TypeOrmModule.forFeature([UsersEntity])],
      providers: [UserService, UsersResolver],
    }).compile();

    usersResolver = app.get<UsersResolver>(UsersResolver);
  });

  describe('users', () => {
    it('findAll', async () => {
      const res = await usersResolver.users();
      expect(Array.isArray(res)).toBeTruthy();
    });

    it('findOne', async () => {
      const res = await usersResolver.user(userId);
      expect(res).toBeTruthy();
    });

    it('patchOne', async () => {
      //@ts-expect-error type
      const res = await usersResolver.updateUser(userId, { login: 'admin' });
      expect(res).toBeTruthy();
    });

    // it('patchAvailableCourses', async () => {
    //   const res = await usersResolver.patchOneAvailableCourses(userId, {
    //     id: '65a6884c14393c319e7526b7',
    //   });
    //   expect(res).toBeTruthy();
    // });
  });
});
