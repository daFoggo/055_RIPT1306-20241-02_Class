import { useEffect, useState } from "react";
import { toast } from "sonner";

import DashboardAnalytics from "@/components/DashboardAnalytics";
import ReuseBreadcrumb from "@/components/ReuseBreadcrumb";
import TaskList from "@/components/TaskList";
import { Separator } from "@/components/ui/separator";

import { IPriority, ITask, ITaskStatus, IUser } from "@/models/TaskList/type";
import axiosAuth from "@/utils/axios";
import { taskIp, userIp } from "@/utils/ip";

const Dashboard = () => {
  const [taskPriorities, setTaskPriorities] = useState<IPriority[]>([]);
  const [taskStatuses, setTaskStatuses] = useState<ITaskStatus[]>([]);
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const [statusesRes, prioritiesRes, tasksRes, usersRes] =
        await Promise.all([
          axiosAuth.get(`${taskIp}/task-statuses`),
          axiosAuth.get(`${taskIp}/task-priorities`),
          axiosAuth.get(`${taskIp}/get-all-task`),
          axiosAuth.get(`${userIp}/get-all-users`),
        ]);
      toast.success("Loaded tasks data successfully");
      setTaskStatuses(statusesRes.data.data);
      setTaskPriorities(prioritiesRes.data.data);
      setTasks(tasksRes.data.data.tasks);
      setUsers(usersRes.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Error loading tasks data");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="space-y-2 py-3 px-4 sm:p-0 sm:py-4">
        <ReuseBreadcrumb
          pageList={[{ name: "Dashboard", link: "/dashboard" }]}
        />
        <h1 className="font-semibold text-lg sm:text-xl">Dashboard</h1>
      </div>
      <Separator className="my-1 sm:my-2" />
      <div className="flex flex-col gap-4 sm:gap-6 py-4 px-4 sm:px-0 sm:py-6">
        <div className="flex flex-col sm:flex-row sm:justify-between gap-4 sm:gap-6 w-full">
          <DashboardAnalytics tasks={tasks} users={users} />
        </div>
        <div className="w-full overflow-x-auto">
          <TaskList
            taskPriorities={taskPriorities}
            taskStatuses={taskStatuses}
            tasks={tasks}
            setTasks={setTasks}
            users={users}
            loading={loading}
            fetchAllData={fetchAllData}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;