import { Test, TestingModule } from '@nestjs/testing';
import { CourseService } from '../services/course.service';
import { UserModule } from '../modules/user.module';
import { userId } from './auth.resolver.spec';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesEntity } from '../entities/course.entity';
import { dbTestModule } from './auth.resolver.spec';
import { CoursesResolver } from './course.resolver';

describe('AppController', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let courseResolver: CoursesResolver;

  let testId = '';

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        UserModule,
        dbTestModule,
        TypeOrmModule.forFeature([CoursesEntity]),
      ],
      providers: [CourseService, CoursesResolver],
    }).compile();

    courseResolver = app.get<CoursesResolver>(CoursesResolver);
  });

  describe('course', () => {
    it('createOne', async () => {
      const res = await courseResolver.addCourse(
        { title: 'test', description: 'test' },
        userId,
      );
      expect(res).toBeTruthy();

      //@ts-expect-error type
      testId = res?.data?.id;
    });

    it('findAll', async () => {
      const res = await courseResolver.courses();
      expect(Array.isArray(res)).toBeTruthy();
    });

    it('findOne', async () => {
      const res = await courseResolver.course(testId);
      expect(res).toBeTruthy();
    });

    it('updateOne', async () => {
      const res = await courseResolver.updateCourse(testId, {
        title: 'test2',
      });
      expect(res).toBeTruthy();
    });

    it('updateRatingOne', async () => {
      const res = await courseResolver.updateRatingCourse(testId, {
        rating: 5,
      });
      expect(res).toBeTruthy();
    });

    it('updateCommentsOne', async () => {
      const res = await courseResolver.updateCommentCourse(testId, {
        author: 'test',
        date: new Date(),
        description: 'test',
      });
      expect(res).toBeTruthy();
    });

    it('delete', async () => {
      const res = await courseResolver.removeCourse(testId);
      expect(res).toBeTruthy();
    });
  });
});
