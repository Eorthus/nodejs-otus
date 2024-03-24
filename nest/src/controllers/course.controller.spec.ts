import { Test, TestingModule } from '@nestjs/testing';
import { CourseController } from '../controllers/course.controller';
import { CourseService } from '../services/course.service';
import { UserModule } from '../modules/user.module';
import { userId } from './auth.controller.spec';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Courses } from '../entities/course.entity';
import { dbTestModule } from './auth.controller.spec';

describe('AppController', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let courseController: CourseController;

  let testId = '';

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [UserModule, dbTestModule, TypeOrmModule.forFeature([Courses])],
      controllers: [CourseController],
      providers: [CourseService],
    }).compile();

    courseController = app.get<CourseController>(CourseController);
  });

  describe('course', () => {
    it('createOne', async () => {
      const res = await courseController.addOne({
        // @ts-expect-error type
        form: { title: 'test', description: 'test' },
        userId,
      });
      expect(res).toBeTruthy();

      //@ts-expect-error type
      testId = res?.data?.id;
    });

    it('findAll', async () => {
      const res = await courseController.findAll();
      expect(Array.isArray(res)).toBeTruthy();
    });

    it('findOne', async () => {
      const res = await courseController.findOne(testId);
      expect(res).toBeTruthy();
    });

    it('updateOne', async () => {
      // @ts-expect-error type
      const res = await courseController.patchOne(testId, { title: 'test2' });
      expect(res).toBeTruthy();
    });

    it('updateRatingOne', async () => {
      const res = await courseController.patchOneRating(testId, { rating: 5 });
      expect(res).toBeTruthy();
    });

    it('updateCommentsOne', async () => {
      // @ts-expect-error type
      const res = await courseController.patchOneComment(testId, {
        author: 'test',
        date: new Date(),
        description: 'test',
      });
      expect(res).toBeTruthy();
    });

    it('delete', async () => {
      const res = await courseController.deleteOne(testId);
      expect(res).toBeTruthy();
    });
  });
});
