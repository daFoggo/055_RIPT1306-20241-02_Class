export interface IModifyTaskProps {
    task: ITask;
    taskPriorities: IPriority[];
    taskStatuses: ITaskStatus[];
    users: IUser[];
    onTaskUpdated: (updatedTask: ITask) => void;
    onTaskDeleted: (taskId: string) => void;
}