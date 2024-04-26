import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { CoursesEntity } from './course.entity';

@Entity()
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  author: string;

  @Column()
  date: Date;

  @Column()
  description: string;

  @ManyToOne(() => CoursesEntity, (course) => course.comments)
  course: CoursesEntity;
}

@Entity()
export class LessonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  video: string;

  @Column('bytea', { array: true })
  attached: unknown[];

  @ManyToOne(() => CoursesEntity, (course) => course.lessons)
  course: CoursesEntity;
}
