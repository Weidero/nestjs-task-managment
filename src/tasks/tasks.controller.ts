import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
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
  createTask(
    @Body('title') title, //nestjs will grab title from body and assign to title variable
    @Body('description') description,
  ): Task {
    return this.tasksService.createTask(title, description);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): Task {
    return this.tasksService.deleteTaskById(id);
  }
}
