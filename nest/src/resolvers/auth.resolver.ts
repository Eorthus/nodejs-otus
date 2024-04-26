import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { TokenModel, UserModel, UserModelInput } from '../models/user.model';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { UsersEntity } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import {
  ConflictException,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';

@Resolver(() => UserModel)
export class AuthResolver {
  constructor(
    private readonly userService: UserService,
    private authService: AuthService,
  ) {}

  @Mutation(() => UserModel)
  async register(
    @Args('form') form: UserModelInput,
  ): Promise<UsersEntity | null> {
    const { login, password } = form;
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
    const newUser = await this.userService.createOne({
      login,
      //@ts-expect-error type
      password: hashedPassword,
      refreshToken,
    });

    return newUser;
  }

  @Mutation(() => TokenModel)
  async login(@Args('form') form: UserModelInput): Promise<TokenModel | null> {
    const { login, password } = form;
    const user = await this.userService.findOne(login);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new ConflictException('Invalid username or password');
    }

    const token = await this.authService.login(user);

    return token;
  }

  @Mutation(() => UserModel)
  async logout(
    @Args('form') form: UserModelInput,
  ): Promise<UsersEntity | null> {
    const { refreshToken } = form;
    const user = await this.userService.findOne(refreshToken);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.refreshToken = null;

    return;
  }

  @Mutation(() => TokenModel)
  async token(@Args('form') form: UserModelInput): Promise<TokenModel> {
    const { refreshToken } = form;
    const user = await this.userService.findOne(refreshToken);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const newToken = await this.authService.login(user.login);

    return newToken;
  }
}
