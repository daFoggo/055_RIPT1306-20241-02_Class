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
  [x: string]: any;
  id: number;
  title: string;
  description: string;
  priority: IPriority;
  status: ITaskStatus;
  dueDate: string;
  assignee: IUser;
  assignor: IUser;
  createdAt: string;
  updatedAt: string;
}

export interface IUser {
  id: number;
  username: string;
  email: string;
  fullName: string;
}

export interface ITaskListProps {
  taskPriorities: IPriority[];
  taskStatuses: ITaskStatus[];
  tasks: ITask[];
  setTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
  users: IUser[];
  loading: boolean;
  fetchAllData: () => void;
}
