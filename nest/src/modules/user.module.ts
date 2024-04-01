import { Module } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UsersEntity } from '../entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersResolver } from '../resolvers/user.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  providers: [UserService, UsersResolver],
  exports: [UserService],
})
export class UserModule {}
