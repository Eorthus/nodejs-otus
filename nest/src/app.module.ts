import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { dbUrl } from './constants/constants';
import { CoursesModule } from './modules/course.module';
import { UserModule } from './modules/user.module';
import { AuthModule } from './modules/auth.module';
import { RolesGuard } from './auth/roles.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    CoursesModule,
    UserModule,
    AuthModule,
    MongooseModule.forRoot(dbUrl),
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
