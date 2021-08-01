import { TaskStatus } from './taskStatus.model';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}
