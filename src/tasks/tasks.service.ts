import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/config/database/prisma.service';
import { CreateTaskRequestDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(private readonly taskRepository: PrismaService) {}

  async createTask(payload: CreateTaskRequestDto): Promise<Task> {
    return this.taskRepository.task.create({
      data: { name: payload.name, status: payload.status },
    });
  }

  async getTasks(): Promise<Task[]> {
    return this.taskRepository.task.findMany();
  }

  async updateTasks(updateTaskDto: UpdateTaskDto) {
    return;
  }

  async deleteTasks(id: number): Promise<void> {
    const taskAlreadyExist = await this.taskRepository.task.findUnique({
      where: { id: +id },
    });

    if (!taskAlreadyExist) {
      throw new NotFoundException({
        code: 404,
        message: 'Task not found',
      });
    }

    await this.taskRepository.task.delete({ where: { id: +id } });
  }
}
