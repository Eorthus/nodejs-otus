import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseController } from 'src/controllers/course.controller';
import { Courses, CoursesSchema } from 'src/schemas/course.schema';
import { CourseService } from 'src/services/course.service';
import { UserModule } from './user.module';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([{ name: Courses.name, schema: CoursesSchema }]),
  ],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CoursesModule {}
