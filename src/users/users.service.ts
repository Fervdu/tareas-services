import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(Users) private userRepository: Repository<Users>) { }

  async create(user: CreateUserDto) {

    const foundUser = await this.userRepository.findOne({
      where: {
        username: user.username
      }
    });

    if (foundUser) {
      return new HttpException('Usuario ya existe', HttpStatus.CONFLICT);
    }

    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: string) {
    const foundUser = await this.userRepository.findOne({ where: { id } });

    if(!foundUser) {
      return new HttpException('Usuario no existe', HttpStatus.NOT_FOUND);
    }

    return foundUser;
  }

  async update(id: string, user: UpdateUserDto) {
    const userUpdate = await this.userRepository.update({ id }, user);

    if(userUpdate.affected === 0) {
      return new HttpException('Usuario no existe', HttpStatus.NOT_FOUND);
    }

    return userUpdate;
  }

  async remove(id: string) {
    const deleteUser = await this.userRepository.delete({ id });

    if(deleteUser.affected === 0) {
      return new HttpException('Usuario no existe', HttpStatus.NOT_FOUND);
    }

    return deleteUser;
  }
}