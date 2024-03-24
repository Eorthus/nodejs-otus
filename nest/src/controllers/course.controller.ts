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
import { CourseType } from '../schemas/course.schema';
import { UserType } from '../schemas/user.schema';
import { CourseService } from '../services/course.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

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
  async findAll(): Promise<CourseType[]> {
    const items = await this.courseService.findAll();

    if (!items) {
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
  async findOne(@Param('id', ParseIntPipe) id: string): Promise<CourseType> {
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
  async addOne(@Body() body: CourseType & UserType['id']): Promise<CourseType> {
    const data = await this.courseService.createOne(body.form, body.userId);

    return data;
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async deleteOne(@Param('id', ParseIntPipe) id: string): Promise<CourseType> {
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
    @Body() body: CourseType,
  ): Promise<CourseType> {
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
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { rating: number },
  ): Promise<CourseType> {
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
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CourseType,
  ): Promise<CourseType> {
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
