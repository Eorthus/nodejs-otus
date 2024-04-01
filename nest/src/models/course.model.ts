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

  @Field()
  description: string;
}

@ObjectType({ description: 'lessons' })
export class LessonModel {
  @Field(() => ID)
  id: number;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  video: string;

  @Field(() => [String])
  attached: string[];
}

@ObjectType({ description: 'course ' })
export class CourseModel {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  description?: string;

  @Field(() => [Number])
  rating?: number[];

  @Field()
  category?: CategoryModel;

  @Field()
  difficulty?: DifficultyModel;

  @Field(() => [LessonModel])
  lessons?: LessonModel[];

  @Field(() => [CommentModel])
  comments?: CommentModel[];
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

  @Field()
  description: string;
}

@InputType({ description: 'lessonsInput' })
export class LessonModelInput {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  video: string;

  @Field(() => [String])
  attached: string[];
}

@InputType({ description: 'courseInput ' })
export class CourseModelInput {
  @Field()
  title: string;

  @Field()
  description?: string;

  @Field(() => [Number])
  rating?: number[];

  @Field()
  category?: CategoryModelInput;

  @Field()
  difficulty?: DifficultyModelInput;

  @Field(() => [LessonModelInput])
  lessons?: LessonModelInput[];

  @Field(() => [CommentModelInput])
  comments?: CommentModelInput[];
}

@InputType({ description: 'ratingInput' })
export class RatingModelInput {
  @Field()
  rating: number;
}
