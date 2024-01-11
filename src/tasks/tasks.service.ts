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
      data: { name: payload.name },
    });
  }

  async getAllTasks(): Promise<Task[]> {
    return this.taskRepository.task.findMany();
  }

  async updateTask(payload: UpdateTaskDto) {
    const { name, status, id } = payload;

    const taskAlreadyExist = await this.taskRepository.task.findUnique({
      where: { id },
    });

    if (!taskAlreadyExist) {
      throw new NotFoundException({
        code: 404,
        message: 'Task not found',
      });
    }

    return this.taskRepository.task.update({
      where: { id },
      data: {
        name,
        status,
      },
    });
  }

  async deleteTask(id: number): Promise<void> {
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
