import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tasks } from './entities/task.entity';
import { Repository } from 'typeorm';
import { ProjectsService } from 'src/projects/projects.service';
import { exit } from 'process';

@Injectable()
export class TasksService {

  constructor(
    private projectService: ProjectsService,
    @InjectRepository(Tasks) private taskRepository: Repository<Tasks>
  ) {}

  async create(task: CreateTaskDto) {
    const projectFound = await this.projectService.findOne(task.projectId);

    if(projectFound instanceof HttpException) {

      throw new HttpException(projectFound.message, projectFound.getStatus())
      
    } else {

      const newTask = this.taskRepository.create(task);
      return this.taskRepository.save(newTask);

    }
    
  }

  findAll() {
    return `This action returns all tasks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
