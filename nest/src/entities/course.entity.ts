import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Comment, Lesson } from './other.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  name: string;
}

@Entity()
export class Difficulty {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  name: string;
}

@Entity()
export class Courses {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  description?: string;

  @Column('int', { array: true, default: [0] })
  rating?: number[];

  @OneToOne(() => Category)
  category?: Category;

  @OneToOne(() => Difficulty)
  difficulty?: Difficulty;

  @OneToMany(() => Lesson, (lesson) => lesson.course)
  @JoinColumn()
  lessons?: Lesson[];

  @OneToMany(() => Comment, (comment) => comment.course)
  @JoinColumn()
  comments?: Comment[];
}
