import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Delete,
  Body,
  Patch,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { Courses } from '../entities/course.entity';
import { CourseService } from '../services/course.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Users } from '../entities/user.entity';
import { Comment } from '../entities/other.entity';

const invalidIdErrorHandler = () => {
  throw new HttpException(
    {
      status: HttpStatus.BAD_REQUEST,
      error: 'Incorrect id',
    },
    HttpStatus.BAD_REQUEST,
  );
};

@Controller('api/courses')
export class CourseController {
  constructor(private courseService: CourseService) {}

  @Get()
  async findAll(): Promise<Courses[]> {
    const items = await this.courseService.findAll();

    if (!items) {
      //TODO res []
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Cant find items',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return items;
  }
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: string): Promise<Courses> {
    if (!id) {
      invalidIdErrorHandler();
    }

    const item = await this.courseService.findOne(id);

    if (!item) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Cant find item',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return item;
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async addOne(
    @Body() body: { form: Courses; userId: Users['id'] },
  ): Promise<Courses> {
    const data = await this.courseService.createOne(body.form, body.userId);

    return data;
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async deleteOne(@Param('id', ParseIntPipe) id: string): Promise<Courses> {
    if (!id) {
      invalidIdErrorHandler();
    }

    const item = await this.courseService.deleteOne(id);

    if (!item) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Cant delete item',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return item;
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async patchOne(
    @Param('id', ParseIntPipe) id: string,
    @Body() body: Courses,
  ): Promise<Courses> {
    if (!id) {
      invalidIdErrorHandler();
    }
    const item = await this.courseService.updateOne(id, body);

    if (!item) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Cant update item',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return item;
  }

  @Patch(':id/rating')
  async patchOneRating(
    @Param('id', ParseIntPipe) id: string,
    @Body() body: { rating: number },
  ): Promise<Courses> {
    if (!id) {
      invalidIdErrorHandler();
    }

    const item = await this.courseService.updateRatingOne(id, body.rating);

    if (!item) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Cant update item',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return item;
  }

  @Patch(':id/comment')
  async patchOneComment(
    @Param('id', ParseIntPipe) id: string,
    @Body() body: Comment,
  ): Promise<Courses> {
    if (!id) {
      invalidIdErrorHandler();
    }
    const item = await this.courseService.updateCommentOne(id, body);

    if (!item) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Cant update item',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return item;
  }
}
