import { Injectable } from '@nestjs/common';
import { Task } from './task.model';
import { TaskStatus } from './taskStatus.model';
import {v4 as uuid} from 'uuid';
import { CreateTaskDTO } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  getAllTasks(): Task[] {
    return this.tasks;
  }
  createTask(createTaskDTO: CreateTaskDTO): Task {
    const { title, description } = createTaskDTO;
    const task: Task = {
      id: uuid(),
      title: title,
      description: description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  } 

  findTaskById(id: string): Task {
    return this.tasks.find((task: Task) => task.id === id);
  }
}
