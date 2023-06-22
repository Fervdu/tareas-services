import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from './entities/user.entity';
import { Profile } from './entities/profile.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Users, Profile])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
