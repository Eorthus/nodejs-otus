import { Module } from '@nestjs/common';
import { CoursesEntity } from '../entities/course.entity';
import { CourseService } from '../services/course.service';
import { UserModule } from './user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesResolver } from '../resolvers/course.resolver';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([CoursesEntity])],
  providers: [CourseService, CoursesResolver],
})
export class CoursesModule {}
