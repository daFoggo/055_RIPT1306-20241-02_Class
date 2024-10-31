import ReuseBreadcrumb from "@/components/ReuseBreadcrumb";
import { Separator } from "@/components/ui/separator";

const Dashboard = () => {
  return (
    <div className="flex flex-col">
      <div className="space-y-2">
        <ReuseBreadcrumb
          pageList={[{ name: "Dashboard", link: "/dashboard" }]}
        />
        <h1 className="font-semibold text-xl">Dashboard</h1>
      </div>
      <Separator className="my-2" />
    </div>
  );
};

export default Dashboard;
