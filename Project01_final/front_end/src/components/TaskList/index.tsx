import { useState, useEffect } from "react";
import axiosAuth from "@/utils/axios";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { taskIp } from "@/utils/ip";
import { IPriority, ITask, ITaskStatus } from "@/models/TaskList/type";
import { Button } from "../ui/button";

const TaskList = () => {
  const [taskPriorities, setTaskPriorities] = useState<IPriority[]>([]);
  const [taskStatuses, setTaskStatuses] = useState<ITaskStatus[]>([]);
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    handleGetTaskStatuses();
  }, []);

  const handleGetTaskStatuses = async () => {
    try {
      const res = await axiosAuth.get(`${taskIp}/task-statuses`);
      setTaskStatuses(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full flex justify-between items-center">
      <Tabs defaultValue="New" className="w-[400px]">
        <TabsList>
          {taskStatuses.map((status, index) => {
            return (
              <TabsTrigger key={index} value={status.name}>
                {status.name}
              </TabsTrigger>
            );
          })}
        </TabsList>
        <TabsContent value="account"></TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>

      <Button>Create new task</Button>
    </div>
  );
};

export default TaskList;
