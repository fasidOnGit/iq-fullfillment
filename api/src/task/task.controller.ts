import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {TaskService} from './task.service';
import {Observable} from 'rxjs';
import {TaskEntity} from './task.entity';

@Controller('task')
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
}
