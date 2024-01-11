import { IsString, IsNotEmpty } from 'class-validator';

export class CreateTaskRequestDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
