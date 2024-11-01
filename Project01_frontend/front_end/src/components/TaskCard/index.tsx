"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { UserPen, UserRoundPlus } from "lucide-react";
import { getPriorityColor } from "@/utils/Helper/TaskCard";
import { ITaskCardProps } from "@/models/TaskCard/type";
import ModifyTask from "../ModifyTask";

export default function TaskCard({
  task,
  taskPriorities,
  taskStatuses,
  users,
  onTaskUpdated,
  onTaskDeleted,
}: ITaskCardProps) {
  return (
    <Card className="w-full mb-4 hover:shadow-md transition-shadow">
      <CardHeader className="relative pb-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold break-words">
              {task.title}
            </CardTitle>
            <CardDescription className="mt-1 break-words">
              {task.description}
            </CardDescription>
          </div>
          
          <div className="absolute top-4 right-4 sm:relative sm:top-0 sm:right-0">
            <ModifyTask
              task={task}
              taskPriorities={taskPriorities}
              taskStatuses={taskStatuses}
              users={users}
              onTaskUpdated={onTaskUpdated}
              onTaskDeleted={onTaskDeleted}
            />
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <Badge 
              className="text-xs" 
              style={{ backgroundColor: getPriorityColor(task.TaskPriority.name) }}
            >
              {task.TaskPriority.name}
            </Badge>
          </div>

          <Separator />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <UserRoundPlus className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">
                Assignee: 
                <span className="ml-1 font-medium">
                  {task.assignee.username}
                </span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <UserPen className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">
                Assignor: 
                <span className="ml-1 font-medium">
                  {task.assignor.username}
                </span>
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}