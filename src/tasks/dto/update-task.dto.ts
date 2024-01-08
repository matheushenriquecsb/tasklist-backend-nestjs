import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskRequestDto } from './create-task.dto';

export class UpdateTaskDto extends PartialType(CreateTaskRequestDto) {}
