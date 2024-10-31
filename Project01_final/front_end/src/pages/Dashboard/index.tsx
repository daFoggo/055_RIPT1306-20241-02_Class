import ReuseBreadcrumb from "@/components/ReuseBreadcrumb";
import TaskList from "@/components/TaskList";
import { Separator } from "@/components/ui/separator";

const Dashboard = () => {
  return (
    <div className="flex flex-col">
      <div className="space-y-2 px-6 py-4">
        <ReuseBreadcrumb
          pageList={[{ name: "Dashboard", link: "/dashboard" }]}
        />
        <h1 className="font-semibold text-xl">Dashboard</h1>
      </div>
      <Separator className="my-2" />
      <div className="flex flex-col gap-4 p-6">
        <TaskList />
      </div>
    </div>
  );
};

export default Dashboard;
