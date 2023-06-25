import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Projects } from './entities/project.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { exit } from 'process';

@Injectable()
export class ProjectsService {

  constructor(
    private usersServices: UsersService,
    @InjectRepository(Projects) private projectRepository: Repository<Projects>) {}

  async create(project: CreateProjectDto) {

      const userFound = await this.usersServices.findOne(project.userId);

      if (userFound instanceof HttpException) {

        throw new HttpException(userFound.message, userFound.getStatus());

      } else {
        
        const newProject = this.projectRepository.create(project);
        return this.projectRepository.save(newProject);

      }

  }

  async findAllByUserId(userId: string) {

    const foundProject = await this.projectRepository.findBy({userId});

    if(!foundProject) {
      return new HttpException('Proyecto no existe', HttpStatus.NOT_FOUND);
    }

    return foundProject;

  }

  async findOne(id: string) {
    const foundProject = await this.projectRepository.findOne({ where: {id}, relations: ['tasks']});

    if(!foundProject) {
      return new HttpException('Proyecto no existe', HttpStatus.NOT_FOUND);
    }

    return foundProject;
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
