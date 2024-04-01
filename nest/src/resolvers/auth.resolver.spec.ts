import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../services/auth.service';
import { jwt_secret } from '../constants/constants';
import { UsersEntity } from '../entities/user.entity';
import { UserModule } from '../modules/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../auth/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersResolver } from './user.resolver';
import { AuthResolver } from './auth.resolver';

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

describe('AuthResolver', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let usersResolver: UsersResolver;
  let authResolver: AuthResolver;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        UserModule,
        PassportModule,
        dbTestModule,
        TypeOrmModule.forFeature([UsersEntity]),
        JwtModule.register({
          secret: jwt_secret,
          signOptions: { expiresIn: '60s' },
        }),
      ],
      providers: [AuthService, JwtStrategy, UsersResolver, AuthResolver],
    }).compile();

    usersResolver = app.get<UsersResolver>(UsersResolver);
    authResolver = app.get<AuthResolver>(AuthResolver);
  });

  describe('auth', () => {
    it('register', async () => {
      const res = await authResolver.register({
        login: testLogin,
        password: testPass,
      });
      expect(res).toBeTruthy();

      userId = res.id;
    });

    it('login', async () => {
      const res = await authResolver.login({
        login: testLogin,
        password: testPass,
      });
      expect(res).toBeTruthy();
    });
  });
});
