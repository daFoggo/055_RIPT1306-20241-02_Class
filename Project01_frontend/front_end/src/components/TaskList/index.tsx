"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import CreateTask from "../CreateTask/";
import TaskCard from "../TaskCard";

import { ITask, ITaskListProps } from "@/models/TaskList/type";
import { formatDisplayDate, groupTasksByDueDate } from "@/utils/Helper/TaskList";

const TaskList = ({
  taskPriorities,
  taskStatuses,
  tasks,
  setTasks,
  users,
  loading,
  fetchAllData,
}: ITaskListProps) => {
  
  // Update UI after CRUD
  const handleTaskCreated = (newTask: ITask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
    fetchAllData();
  };

  const handleTaskUpdated = (updatedTask: ITask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    fetchAllData();
  };

  const handleTaskDeleted = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== parseInt(taskId))
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-full max-w-[100vw]">
      <Tabs defaultValue={taskStatuses[0]?.name} className="w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
          <TabsList className="h-auto flex-wrap">
            <div className="flex flex-wrap gap-2">
              {taskStatuses.map((status) => (
                <TabsTrigger
                  key={status.id}
                  value={status.name}
                  className="px-3 py-1.5 text-sm"
                >
                  {status.name}
                </TabsTrigger>
              ))}
            </div>
          </TabsList>

          <div className="w-full sm:w-auto">
            <CreateTask
              taskPriorities={taskPriorities}
              taskStatuses={taskStatuses}
              users={users}
              onTaskCreated={handleTaskCreated}
            />
          </div>
        </div>

        {taskStatuses.map((status) => (
          <TabsContent
            key={status.id}
            value={status.name}
            className="mt-4 sm:mt-6"
          >
            <ScrollArea className="h-[calc(100vh-280px)] sm:h-[calc(100vh-200px)] rounded-xl border p-2 sm:p-4">
              <div className="flex flex-col space-y-4 sm:space-y-6">
                {groupTasksByDueDate(
                  tasks.filter((task) => task.TaskStatus.id === status.id)
                ).map(([date, dateTasks]) => (
                  <div key={date} className="space-y-3">
                    <h2 className="text-lg sm:text-xl font-semibold text-primary px-2">
                      Due to {formatDisplayDate(date)}
                    </h2>
                    <div className="grid gap-3 sm:gap-4">
                      {dateTasks.map((task) => (
                        <TaskCard
                          key={task.id}
                          task={task}
                          taskPriorities={taskPriorities}
                          taskStatuses={taskStatuses}
                          users={users}
                          onTaskUpdated={handleTaskUpdated}
                          onTaskDeleted={handleTaskDeleted}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default TaskList;
