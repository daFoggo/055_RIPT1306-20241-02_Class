const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../config/db.js");
const TaskPriority = require("./taskPriority");
const TaskStatus = require("./taskStatus");
const User = require("./user");

class Task extends Model {}

Task.init(
  {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    dueDate: DataTypes.DATE,
    priorityId: {
      type: DataTypes.INTEGER,
      references: {
        model: TaskPriority,
        key: "id",
      },
    },
    statusId: {
      type: DataTypes.INTEGER,
      references: {
        model: TaskStatus,
        key: "id",
      },
    },
    assignorId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },
    assigneeId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  { sequelize, modelName: "task" }
);

TaskPriority.hasMany(Task, { foreignKey: "priorityId" });
Task.belongsTo(TaskPriority, { foreignKey: "priorityId" });

TaskStatus.hasMany(Task, { foreignKey: "statusId" });
Task.belongsTo(TaskStatus, { foreignKey: "statusId" });

User.hasMany(Task, { as: "assignedTasks", foreignKey: "assigneeId" });
User.hasMany(Task, { as: "createdTasks", foreignKey: "assignorId" });

Task.belongsTo(User, { as: "assignor", foreignKey: "assignorId" });
Task.belongsTo(User, { as: "assignee", foreignKey: "assigneeId" });

module.exports = Task;
