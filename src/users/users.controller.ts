import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './entities/user.entity';
import { CreateProfileDto } from './dto/create-profile.dto';

const { v4: uuidv4 } = require('uuid');

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() newUser: CreateUserDto) {

    const id = {
      id: uuidv4()
    }
    Object.assign(newUser, id);

    return this.usersService.create(newUser);
  }

  @Get()
  findAll(): Promise<Users[]> {
    return this.usersService.findAll();
  }

  @Get('id/:id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Get('username/:username')
  findByUser(@Param('username') username: string) {
    return this.usersService.findByUser(username);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() user: UpdateUserDto) {
    return this.usersService.update(id, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Post(':id/profile')
  createProfile(@Param('id') id: string, @Body() profile: CreateProfileDto) {

    const idProfile = {
      id: uuidv4()
    }
    Object.assign(profile, idProfile);

    return this.usersService.createProfile(id, profile);
  }
}
