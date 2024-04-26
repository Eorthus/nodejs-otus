import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { CommentEntity, LessonEntity } from './other.entity';

@Entity()
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  name: string;
}

@Entity()
export class DifficultyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  name: string;
}

@Entity()
export class CoursesEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  description?: string;

  @Column('int', { array: true, default: [0] })
  rating?: number[];

  @OneToOne(() => CategoryEntity)
  category?: CategoryEntity;

  @OneToOne(() => DifficultyEntity)
  difficulty?: DifficultyEntity;

  @OneToMany(() => LessonEntity, (lesson) => lesson.course)
  @JoinColumn()
  lessons?: LessonEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.course)
  @JoinColumn()
  comments?: CommentEntity[];
}
