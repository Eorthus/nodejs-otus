import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoursesModule } from './modules/course.module';
import { UserModule } from './modules/user.module';
import { AuthModule } from './modules/auth.module';
import { RolesGuard } from './auth/roles.guard';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

@Module({
  imports: [
    CoursesModule,
    UserModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'postgres',
      password: '0000',
      database: 'courses',
      entities: [__dirname + '/../**/*.entity.js'],
      synchronize: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      installSubscriptionHandlers: true,
      sortSchema: true,
      context: ({ req, res }) => ({ req, res }),
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
