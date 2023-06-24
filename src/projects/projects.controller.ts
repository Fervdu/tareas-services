import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from "src/guard/jwtauth.guard";

const { v4: uuidv4 } = require('uuid');

@ApiBearerAuth()
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() newProject: CreateProjectDto,@Req() request) {

    const userId = request.user.id;
    const id = {
      userId,
      id: uuidv4()
    }
    Object.assign(newProject, id);

    return this.projectsService.create(newProject);
  }
  
  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Req() request) {

    const userId = request.user.id;

    console.log({userId});
    
    return this.projectsService.findAllByUserId(userId);

  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(+id, updateProjectDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.projectsService.remove(+id);
  }
}
