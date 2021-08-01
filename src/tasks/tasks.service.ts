import { Injectable } from '@nestjs/common';
import { Task } from './task.model';
import { TaskStatus } from './taskStatus.model';
import {v4 as uuid} from 'uuid';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  getAllTasks(): Task[] {
    return this.tasks;
  }
  createTask(taskTitle: string, taskDescription: string): Task {
    const task: Task = {
      id: uuid(),
      title: taskTitle,
      description: taskDescription,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  } 
}
