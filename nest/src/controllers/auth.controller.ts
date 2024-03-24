import {
  Controller,
  Post,
  HttpException,
  HttpStatus,
  Body,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { Users } from '../entities/user.entity';

@Controller('api/auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('register')
  async register(
    @Body() body: { login: string; password: string },
  ): Promise<Users[]> {
    const { login, password } = body;
    if (!login && !password) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'All Fields are required',
        },
        HttpStatus.FORBIDDEN,
      );
    }

    // Check if user already exists
    const existingUser = await this.userService.findOne(login);

    if (existingUser) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: 'Username already exists',
        },
        HttpStatus.CONFLICT,
      );
    }

    // Hash the password before saving it to the database
    const salt = await bcrypt.genSalt(15);
    const hashedPassword = await bcrypt.hash(password, salt);
    const refreshToken = crypto.randomBytes(64).toString('hex');

    // Create and save the new user
    //@ts-expect-error type
    const newUser = await this.userService.createOne({
      login,
      password: hashedPassword,
      refreshToken,
    });

    return JSON.parse(JSON.stringify(newUser));
  }

  @Post('login')
  async login(
    @Body() body: { login: string; password: string },
  ): Promise<string> {
    const { login, password } = body;
    const user = await this.userService.findOne(login);
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Invalid username or password',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Invalid username or password',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const token = await this.authService.login(user);

    return token.access_token;
  }

  @Post('logout')
  async logout(@Body() body: { refreshToken: string }): Promise<Users> {
    const { refreshToken } = body;
    const user = await this.userService.findOne(refreshToken);
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Invalid refresh token',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    user.refreshToken = null;

    return;
  }

  @Post('token')
  async token(@Body() body: { refreshToken: string }): Promise<string> {
    const { refreshToken } = body;
    const user = await this.userService.findOne(refreshToken);
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Invalid refresh token',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const newToken = await this.authService.login(user.login);

    return newToken.access_token;
  }
}
