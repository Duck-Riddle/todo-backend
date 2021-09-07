import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TaskDTO } from './dto/creatTask.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  async fetchAll(): Promise<any[]> {
    const tasks = await this.tasksService.getTasks();
    return tasks.map((task) => ({
      id: task._id,
      txt: task.txt,
      done: task.done,
      timeStamp: task.timeStamp,
    }));
  }

  @Get(':id')
  async fetchOne(@Param('id') id: string): Promise<any> {
    const task = await this.tasksService.getTask(id);
    return {
      id: task._id,
      txt: task.txt,
      done: task.done,
      timeStamp: task.timeStamp,
    };
  }

  @Post()
  async newTask(@Body() taskDTO: TaskDTO): Promise<any> {
    const task = await this.tasksService.addTask(taskDTO);
    return {
      id: task._id,
      txt: task.txt,
      done: task.done,
      timeStamp: task.timeStamp,
    };
  }

  @Put(':id')
  async updateTaskDone(@Param('id') id: string, @Body() body): Promise<any> {
    const resoult = await this.tasksService.toggleTaskDone(id, body.done);
    return `${resoult}`;
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<any> {
    await this.tasksService.deleteTask(id);
    return `there is no more id:${id}`;
  }
}
