export interface IPriority {
  id: number;
  name: string;
  description: string;
}

export interface ITaskStatus {
  id: number;
  name: string;
  description: string;
}

export interface ITask {
  id: number;
  title: string;
  description: string;
  priority: string;
  status: string;
  dueDate: string;
  assignor: string;
  assignee: string;
  createdAt: string;
  updatedAt: string;
}
