import { Module } from '@nestjs/common';
import { CourseController } from '../controllers/course.controller';
import { Courses } from '../entities/course.entity';
import { CourseService } from '../services/course.service';
import { UserModule } from './user.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([Courses])],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CoursesModule {}
