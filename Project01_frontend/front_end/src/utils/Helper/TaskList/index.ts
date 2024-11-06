import { ITask } from "@/models/TaskList/type";

export const formatDisplayDate = (dateString: string) => {
  try {
    const localDate = getDateWithoutTime(dateString);
    if (!localDate) {
      return "Invalid Date";
    }

    return localDate.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch (error) {
    console.error("Error formatting display date:", error);
    return "Invalid Date Format";
  }
};

export const getDateWithoutTime = (dateString: string) => {
  try {
    const date = new Date(dateString);

    const localDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );

    return localDate;
  } catch (error) {
    console.error("Error parsing date:", dateString, error);
    return null;
  }
};

export const groupTasksByDueDate = (tasks: ITask[]) => {
  const grouped = tasks.reduce((acc, task) => {
    const dateObj = getDateWithoutTime(task.dueDate);
    if (!dateObj) {
      return acc;
    }

    const dateKey = dateObj.toISOString().split("T")[0];

    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(task);
    return acc;
  }, {} as Record<string, ITask[]>);

  return Object.entries(grouped).sort(
    ([dateA], [dateB]) => new Date(dateA).getTime() - new Date(dateB).getTime()
  );
};
