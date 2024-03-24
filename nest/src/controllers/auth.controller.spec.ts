import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../services/auth.service';
import { jwt_secret } from '../constants/constants';
import { Users } from '../entities/user.entity';
import { AuthController } from './auth.controller';
import { UserController } from './user.controller';
import { UserModule } from '../modules/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../auth/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

const testLogin = String(Math.random());
const testPass = 'test2';
export let userId = '';

export const dbTestModule = TypeOrmModule.forRoot({
  type: 'postgres',
  host: '127.0.0.1',
  port: 5432,
  username: 'postgres',
  password: '0000',
  database: 'courses',
  entities: [__dirname + '/../**/*.entity.ts'],
  synchronize: true,
});

describe('AuthController', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let userController: UserController;
  let authController: AuthController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        UserModule,
        PassportModule,
        dbTestModule,
        TypeOrmModule.forFeature([Users]),
        JwtModule.register({
          secret: jwt_secret,
          signOptions: { expiresIn: '60s' },
        }),
      ],
      controllers: [AuthController],
      providers: [AuthService, JwtStrategy],
    }).compile();

    userController = app.get<UserController>(UserController);
    authController = app.get<AuthController>(AuthController);
  });

  describe('auth', () => {
    it('register', async () => {
      const res = await authController.register({
        login: testLogin,
        password: testPass,
      });
      expect(res).toBeTruthy();

      //@ts-expect-error type
      userId = res.id;
    });

    it('login', async () => {
      const res = await authController.login({
        login: testLogin,
        password: testPass,
      });
      expect(res).toBeTruthy();
    });
  });
});
