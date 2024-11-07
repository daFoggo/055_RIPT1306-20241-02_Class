import { ITask } from "../TaskList/type";
export interface ITaskCardProps {
    task: ITask;
    taskPriorities: IPriority[];
    taskStatuses: ITaskStatus[];
    users: IUser[];
    onTaskUpdated: (updatedTask: ITask) => void;
    onTaskDeleted: (taskId: string) => void;
}