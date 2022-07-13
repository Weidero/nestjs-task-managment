import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dtos/create-task.dto';
import { GetTaskFilterDto } from './dtos/get-task-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TasksRepository } from './tasks.repository';
@Injectable()
export class TasksService {
  constructor(private taskEntityRepository: TasksRepository) {}

  async getTaskById(id: string): Promise<Task> {
    return await this.taskEntityRepository.findById(id);
  }

  async getTasks(filterDto: GetTaskFilterDto): Promise<Task[]> {
    return this.taskEntityRepository.getTasks(filterDto);
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = this.taskEntityRepository.createTask(title, description);
    return task;
  }

  async deleteTaskById(id: string): Promise<void> {
    return this.taskEntityRepository.deleteTaskById(id);
  }

  updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    return this.taskEntityRepository.updateTaskStatus(id, status);
  }
}
