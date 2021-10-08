import { TaskStatus } from './taskStatus.model';

export interface Task {
  id: BigInteger;
  title: string;
  description: string;
  status: TaskStatus;
}
