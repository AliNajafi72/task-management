import { Body, Injectable, Param, Patch } from '@nestjs/common';
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

  deleteTaskById(id: string): {id: string} {
    const filterdTasks = this.tasks.filter((task) => task.id !== id);
    this.tasks = filterdTasks;
    return {id: id};
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    const task = this.findTaskById(id);
    task.status = status;
    return task;
  } 
}
