"use client";
import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Users, ClipboardList, BadgePlus, LoaderCircle } from "lucide-react";
import StatisticBlock from "../StatisticBlock";
import ChartTooltip from "../ChartTooltip";

import { IDashboardAnalyticsProps } from "@/models/DashboardAnalytics/type";

const DashboardAnalytics = ({ tasks, users }: IDashboardAnalyticsProps) => {
  const analytics = useMemo(() => {
    const totalTasks = tasks.length;

    // task stats based on status
    const newTasks = tasks.filter((task) => task.TaskStatus.id === 1).length;
    const inProgressTasks = tasks.filter(
      (task) => task.TaskStatus.id === 2
    ).length;
    const cancelledTasks = tasks.filter(
      (task) => task.TaskStatus.id === 3
    ).length;
    const holdTasks = tasks.filter((task) => task.TaskStatus.id === 4).length;

    // completion rate
    const completionRate = (
      ((inProgressTasks + holdTasks) / totalTasks) *
      100
    ).toFixed(1);

    // upcoming deadlines on the next 3 days
    const today = new Date();
    const threeDaysFromNow = new Date();
    threeDaysFromNow.setDate(today.getDate() + 3);

    const upcomingDeadlines = tasks.filter((task) => {
      const dueDate = new Date(task.dueDate);
      return dueDate >= today && dueDate <= threeDaysFromNow;
    }).length;

    // tasks distributed by priority
    const caculatePriorityData = (acc: any, task: any) => {
      const priority = task.TaskPriority.name;
      acc[priority] = (acc[priority] || 0) + 1;
      return acc;
    };
    const priorityData = tasks.reduce(caculatePriorityData, {});

    const chartData = Object.entries(priorityData).map(([name, value]) => ({
      name,
      tasks: value,
    }));

    // tasks distributed by assignee
    const caculateAssigneeData = (acc: any, task: any) => {
      const assigneeName = task.assignee.username;
      acc[assigneeName] = (acc[assigneeName] || 0) + 1;
      return acc;
    };

    const assigneeDistribution = tasks.reduce(caculateAssigneeData, {});

    return {
      totalTasks,
      newTasks,
      inProgressTasks,
      cancelledTasks,
      holdTasks,
      completionRate,
      upcomingDeadlines,
      chartData,
      assigneeDistribution,
    };
  }, [tasks]);

  return (
    <div className="space-y-4 w-full">
      <div className="flex overflow-x-auto sm:grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatisticBlock
          title="Tasks count"
          icon={<ClipboardList className="h-4 w-4 text-muted-foreground" />}
          displayData={analytics.totalTasks}
          description={`${analytics.completionRate}% was completed`}
        />

        <StatisticBlock
          title="New tasks"
          icon={<BadgePlus className="h-4 w-4 text-muted-foreground" />}
          displayData={analytics.newTasks}
          description="Have not been started yet"
        />

        <StatisticBlock
          title="In progress tasks"
          icon={<LoaderCircle className="h-4 w-4 text-muted-foreground" />}
          displayData={analytics.inProgressTasks}
          description="Tasks that are being worked on"
        />

        <StatisticBlock
          title="Contributors"
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
          displayData={users.length}
          description="People working on these tasks"
        />
      </div>

      <Card className="shadow-sm rounded-lg">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-base sm:text-lg">
            Task distributed by Priority
          </CardTitle>
        </CardHeader>
        <CardContent className="p-2 sm:p-6">
          <div className="h-[200px] sm:h-[250px] lg:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={analytics.chartData}
                margin={{
                  top: 5,
                  right: 5,
                  left: 0,
                  bottom: 5,
                }}
              >
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12 }}
                  interval={0}
                  tickMargin={8}
                />
                <YAxis tick={{ fontSize: 12 }} width={30} />
                <Tooltip
                  content={
                    <ChartTooltip
                      active={false}
                      payload={undefined}
                      label={""}
                    />
                  }
                />
                <Bar
                  dataKey="tasks"
                  fill="#7c3aed"
                  className="transition-colors"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardAnalytics;
