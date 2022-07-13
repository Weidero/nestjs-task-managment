import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetTaskFilterDto } from './dtos/get-task-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';

@Injectable()
export class TasksRepository {
  constructor(
    @InjectRepository(Task)
    private readonly taskEntityRepository: Repository<Task>,
  ) {}

  async findById(id: string): Promise<Task> {
    const found = await this.taskEntityRepository.findOneBy({ id });
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  async createTask(title: string, description: string): Promise<Task> {
    const task = this.taskEntityRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });
    await this.taskEntityRepository.save(task);
    return task;
  }

  async deleteTaskById(id: string): Promise<void> {
    const result = await this.taskEntityRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }

  async updateTaskStatus(id: string, taskStatus: TaskStatus): Promise<Task> {
    const task = await this.findById(id);
    task.status = taskStatus;
    await this.taskEntityRepository.save(task);
    return task;
  }

  async getTasks(filterDto: GetTaskFilterDto): Promise<Task[]> {
    const query = this.taskEntityRepository.createQueryBuilder('task');
    const { status, search } = filterDto;

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        'LOWER (task.title) LIKE LOWER :search OR LOWER (task.description) LIKE LOWER :search',
        { search: `%${search}%` },
      );
    }
    const tasks = await query.getMany();
    return tasks;
  }
}
