import { Test, TestingModule } from '@nestjs/testing';
import { CourseController } from '../controllers/course.controller';
import { CourseService } from '../services/course.service';
import { dbUrl } from '../constants/constants';
import { MongooseModule } from '@nestjs/mongoose';
import { CoursesSchema, Courses } from '../schemas/course.schema';
import { UserModule } from '../modules/user.module';
import { userId } from './auth.controller.spec';

describe('AppController', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let courseController: CourseController;

  let testId = '';

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        UserModule,
        MongooseModule.forRoot(dbUrl),
        MongooseModule.forFeature([
          {
            name: Courses.name,
            schema: CoursesSchema,
          },
        ]),
      ],
      controllers: [CourseController],
      providers: [CourseService],
    }).compile();

    courseController = app.get<CourseController>(CourseController);
  });

  describe('course', () => {
    it('findAll', async () => {
      const res = await courseController.findAll();
      expect(Array.isArray(res)).toBeTruthy();
    });

    it('createOne', async () => {
      const res = await courseController.addOne({
        form: { title: 'test' },
        userId,
      });

      expect(res).toBeTruthy();

      // @ts-expect-error type
      testId = res?.data._id;
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
      // @ts-expect-error type
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
