import {Body, Controller, Get, Param, Post, Put, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import {TaskService} from './task.service';
import {Observable} from 'rxjs';
import {TaskEntity} from './task.entity';
import {AuthGuard} from '@nestjs/passport';

@Controller('task')
@UseGuards(AuthGuard())
export class TaskController {
  constructor(private readonly taskService: TaskService) {
  }

  @Get()
  findAll(): Observable<TaskEntity[]> {
    return this.taskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<TaskEntity> {
    return this.taskService.findById(id);
  }

  @Post()
  create(@Body() taskDto: TaskEntity): Observable<TaskEntity> {
    return this.taskService.create(taskDto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({
    groups: ['update']
  }))
  update(@Param('id') id: string, @Body() taskDto: TaskEntity): Observable<void> {
    return this.taskService.update(id, taskDto);
  }

  @Get(':id')
  delete(@Param('id') id: string): Observable<void> {
    return this.taskService.delete(id);
  }
}
