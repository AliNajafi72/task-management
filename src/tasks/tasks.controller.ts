import { Body, Controller, Delete, Get, Param, Post, Patch, Query } from '@nestjs/common';
import { query } from 'express';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskSTatusDTO } from './dto/update-task-status.dto';
import { Task } from './task.model';
import { TasksService } from './tasks.service';
import { TaskStatus } from './taskStatus.model';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {
    this.tasksService = tasksService;
  }

  @Get()
  getTasks(@Query() searchParam:{title?: string, status?: TaskStatus}): Task[] {
    return this.tasksService.getTasks(searchParam);
  }

  @Post()
  createTask(@Body() createTaskDTO: CreateTaskDTO): Task {
    return this.tasksService.createTask(createTaskDTO);
  }

  @Get('/:id')
  findTaskById(@Param('id') id: string): Task{
    return this.tasksService.findTaskById(id)
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id:string): {id: string} {
    return this.tasksService.deleteTaskById(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(@Param('id') id:string, @Body() updateTaskStatusDTO: UpdateTaskSTatusDTO): Task {
    const { status } = updateTaskStatusDTO;
    return this.tasksService.updateTaskStatus(id, status);
  }

  
}
