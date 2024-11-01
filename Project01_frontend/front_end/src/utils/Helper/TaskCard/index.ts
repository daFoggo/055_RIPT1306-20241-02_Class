export const getPriorityColor = (priority: string) => {
  switch (priority.toLowerCase()) {
    case "urgent":
      return "#ef4444";
    case "high":
      return "#eab308";
    case "medium":
      return "#3b82f6";
    case "normal":
      return "#7c3aed";
    default:
      return "#6b7280";
  }
};
