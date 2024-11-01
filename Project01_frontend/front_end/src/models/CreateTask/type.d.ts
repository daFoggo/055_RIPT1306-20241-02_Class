import { IPriority, ITaskStatus, IUser } from "../TaskList/type";

export interface ICreateTaskProps {
  taskPriorities: IPriority[];
  taskStatuses: ITaskStatus[];
  users: IUser[];
  onTaskCreated: () => void;
}
