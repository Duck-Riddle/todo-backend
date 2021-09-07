import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { TaskDTO } from './dto/creatTask.dto';
import { TaskDocument } from './schemas/task.schema';

@Injectable()
export class TasksService {
  constructor(@InjectModel('Task') private taskModel: Model<TaskDocument>) {}

  async addTask(taskDTO: TaskDTO): Promise<TaskDocument> {
    const newTask = new this.taskModel(taskDTO);
    return await newTask.save();
  }
  async getTask(postID): Promise<TaskDocument> {
    const task = await this.taskModel.findById(postID).exec();
    return task;
  }

  async getTasks(): Promise<TaskDocument[]> {
    const tasks = await this.taskModel.find().exec();
    return tasks;
  }
  async toggleTaskDone(taskID, done): Promise<TaskDocument | string> {
    try {
      const task = await this.getTask(taskID);
      task.done = !done;
      return await task.save();
    } catch (err) {
      return `Task was not found: ${err}`;
    }
  }
  async deleteTask(taskID): Promise<TaskDocument | string> {
    try {
      const task = await this.getTask(taskID);
      task.delete();
    } catch (err) {
      return `Task was not found: ${err}`;
    }
  }
}
