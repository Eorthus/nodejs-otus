import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../services/auth.service';
import { dbUrl, jwt_secret } from '../constants/constants';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, Users } from '../schemas/user.schema';
import { AuthController } from './auth.controller';
import { UserController } from './user.controller';
import { UserModule } from '../modules/user.module';
import { JwtModule} from '@nestjs/jwt';
import { JwtStrategy } from '../auth/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

const testLogin = String(Math.random());
const testPass = 'test2';
export let userId = '';

describe('AuthController', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let userController: UserController;
  let authController: AuthController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        UserModule,
        PassportModule,
        MongooseModule.forRoot(dbUrl),
        MongooseModule.forFeature([
          {
            name: Users.name,
            schema: UserSchema,
          },
        ]),
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
      userId = res._id;
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
