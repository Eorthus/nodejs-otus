import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CourseType = HydratedDocument<Courses>;

export type CategoryType = HydratedDocument<Category>;

export type DifficultyType = HydratedDocument<Difficulty>;

export type CommentType = HydratedDocument<Comment>;

export type LessonType = HydratedDocument<Lesson>;

@Schema()
export class Category {
  @Prop()
  title: string;

  @Prop()
  name: string;
}

@Schema()
export class Difficulty {
  @Prop()
  title: string;

  @Prop()
  name: string;
}

@Schema()
export class Comment {
  @Prop()
  author: string;

  @Prop()
  date: Date;

  @Prop()
  description: string;
}

@Schema()
export class Lesson {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  video: string;

  @Prop()
  attached: unknown[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);

export const DifficultySchema = SchemaFactory.createForClass(Difficulty);

export const CommentsSchema = SchemaFactory.createForClass(Comment);

export const LessonsSchema = SchemaFactory.createForClass(Lesson);

@Schema()
export class Courses {
  @Prop()
  title: string;

  @Prop()
  description?: string;

  @Prop()
  rating?: number[];

  @Prop()
  category?: Category;

  @Prop()
  difficulty?: Difficulty;

  @Prop()
  lessons?: Lesson[];

  @Prop()
  comments?: Comment[];
}

export const CoursesSchema = SchemaFactory.createForClass(Courses);
