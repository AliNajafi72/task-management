import { Body, Injectable, NotFoundException, Param, Patch } from '@nestjs/common';
import { Task } from './task.model';
import { TaskStatus } from './taskStatus.model';
import {v4 as uuid} from 'uuid';
import { CreateTaskDTO } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  getTasks(searchParam: {title?: string, status?: TaskStatus}): Task[] {
    let searchResult: Task[] = this.tasks;
    if(searchParam.title) { 
      return searchResult = searchResult.filter((task) => task.title === searchParam.title);
    }
    else if(searchParam.status) {
      return searchResult.filter((task) => task.status === searchParam.status);
    }
    return searchResult;
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
    const found = this.tasks.find((task: Task) => task.id === id);
    if(! found) throw new NotFoundException(`Task with the id of "${id}" not found!`);
    return found;
  }

  deleteTaskById(id: string): {id: string} {
    const found = this.findTaskById(id);
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
