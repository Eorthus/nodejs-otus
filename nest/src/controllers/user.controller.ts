import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Body,
  Patch,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CourseType } from '../schemas/course.schema';
import { UserType } from '../schemas/user.schema';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UserService } from '../services/user.service';
import { HasRoles, Role } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

const invalidIdErrorHandler = () => {
  throw new HttpException(
    {
      status: HttpStatus.BAD_REQUEST,
      error: 'Incorrect id',
    },
    HttpStatus.BAD_REQUEST,
  );
};

@Controller('api/users')
export class UserController {
  constructor(private userService: UserService) {}

  @HasRoles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async findAll(): Promise<UserType[]> {
    const items = await this.userService.findAll();

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

  @HasRoles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: string): Promise<UserType> {
    if (!id) {
      invalidIdErrorHandler();
    }

    const item = await this.userService.findOneById(id);

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

  @HasRoles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  async patchOne(
    @Param('id', ParseIntPipe) id: string,
    @Body() body: UserType,
  ): Promise<UserType> {
    if (!id) {
      invalidIdErrorHandler();
    }
    const item = await this.userService.updateOne(id, body);

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

  @HasRoles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id/available')
  async patchOneAvailableCourses(
    @Param('id', ParseIntPipe) id: string,
    @Body() body: { id: CourseType['id'] },
  ): Promise<UserType> {
    if (!id) {
      invalidIdErrorHandler();
    }
    const item = await this.userService.updateAvailableCoursesOne(id, body.id);

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
