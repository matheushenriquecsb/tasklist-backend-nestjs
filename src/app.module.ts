import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { PrismaService } from './config/database/prisma.service';

@Module({
  imports: [TasksModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
