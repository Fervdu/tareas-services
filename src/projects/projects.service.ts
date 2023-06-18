import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Projects } from './entities/project.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ProjectsService {

  constructor(
    private usersServices: UsersService,
    @InjectRepository(Projects) private projectRepository: Repository<Projects>) {}

  async create(project: CreateProjectDto) {
    const userFound = await this.usersServices.findOne(project.userId);

    if(!userFound) {
      return new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }

    const newProject = this.projectRepository.create(project);
    return this.projectRepository.save(newProject);

  }

  findAll() {
    return this.projectRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} project`;
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
