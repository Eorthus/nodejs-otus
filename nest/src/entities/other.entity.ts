import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Courses } from './course.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  author: string;

  @Column()
  date: Date;

  @Column()
  description: string;

  @ManyToOne(() => Courses, (course) => course.comments)
  course: Courses;
}

@Entity()
export class Lesson {
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

  @ManyToOne(() => Courses, (course) => course.lessons)
  course: Courses;
}
