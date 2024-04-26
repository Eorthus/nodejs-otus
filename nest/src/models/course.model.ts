import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'category' })
export class CategoryModel {
  @Field(() => ID)
  id: number;

  @Field()
  title: string;

  @Field()
  name: string;
}

@ObjectType({ description: 'difficulty' })
export class DifficultyModel {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  name: string;
}

@ObjectType({ description: 'comment' })
export class CommentModel {
  @Field(() => ID)
  id: number;

  @Field()
  author: string;

  @Field()
  date: Date;

  @Field({ nullable: true })
  description: string;
}

@ObjectType({ description: 'lessons' })
export class LessonModel {
  @Field(() => ID)
  id: number;

  @Field()
  title: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  video: string;

  @Field(() => [String], { nullable: true })
  attached: string[];
}

@ObjectType({ description: 'course ' })
export class CourseModel {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  description: string;

  @Field(() => [Number], { nullable: true })
  rating: number[];

  @Field({ nullable: true })
  category: CategoryModel;

  @Field({ nullable: true })
  difficulty: DifficultyModel;

  @Field(() => [LessonModel], { nullable: true })
  lessons: LessonModel[];

  @Field(() => [CommentModel], { nullable: true })
  comments: CommentModel[];
}

// inputs

@InputType({ description: 'categoryInput' })
export class CategoryModelInput {
  @Field()
  title: string;

  @Field()
  name: string;
}

@InputType({ description: 'difficultyInput' })
export class DifficultyModelInput {
  @Field()
  title: string;

  @Field()
  name: string;
}

@InputType({ description: 'commentInput' })
export class CommentModelInput {
  @Field()
  author: string;

  @Field()
  date: Date;

  @Field({ nullable: true })
  description: string;
}

@InputType({ description: 'lessonsInput' })
export class LessonModelInput {
  @Field()
  title: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  video: string;

  @Field(() => [String], { nullable: true })
  attached: string[];
}

@InputType({ description: 'courseInput ' })
export class CourseModelInput {
  @Field()
  title: string;

  @Field({ nullable: true })
  description: string;

  @Field(() => [Number], { nullable: true })
  rating: number[];

  @Field({ nullable: true })
  category: CategoryModelInput;

  @Field({ nullable: true })
  difficulty: DifficultyModelInput;

  @Field(() => [LessonModelInput], { nullable: true })
  lessons: LessonModelInput[];

  @Field(() => [CommentModelInput], { nullable: true })
  comments: CommentModelInput[];
}

@InputType({ description: 'ratingInput' })
export class RatingModelInput {
  @Field()
  rating: number;
}
