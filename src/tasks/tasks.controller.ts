import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateTaskDto } from './dtos/crate-task-dto';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

@Controller('/tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {} //injection service

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string) {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): void {
    return this.tasksService.deleteTaskById(id);
  }
}
