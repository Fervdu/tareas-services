import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Projects } from './entities/project.entity';
import { UsersModule } from 'src/users/users.module';
import { GuardModule } from 'src/guard/guard.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Projects]),
    UsersModule,
    GuardModule
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService],
  exports: [ProjectsService]
})
export class ProjectsModule {}
