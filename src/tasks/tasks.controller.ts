import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskRequestDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from '@prisma/client';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  createTask(@Body() createTaskDto: CreateTaskRequestDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }

  @Get()
  findAll(): Promise<Task[]> {
    return this.tasksService.getTasks();
  }

  @Patch()
  update(@Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.updateTasks(updateTaskDto);
  }

  @Delete(':id')
  deleteTasks(@Param('id') id: string): Promise<void> {
    return this.tasksService.deleteTasks(+id);
  }
}
