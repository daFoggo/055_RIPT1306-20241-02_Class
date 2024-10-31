const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db.js");

const User = require("./user");
const TaskPriority = require("./taskPriority");
const TaskStatus = require("./taskStatus");


const Task = sequelize.define(
  "Task",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    priorityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "priorityId",
      references: {
        model: TaskPriority,
        key: "id",
      },
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "dueDate",
    },
    statusId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "statusId",
      references: {
        model: TaskStatus,
        key: "id",
      },
    },
    assignorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "assignorId",
      references: {
        model: User,
        key: "id",
      },
    },
    assigneeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "assigneeId",
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  }
);

module.exports = Task;

// constraints
module.exports.associateTask = (models) => {
  const { User, TaskPriority, TaskStatus } = models;

  Task.belongsTo(TaskPriority, { foreignKey: "priorityId" });
  Task.belongsTo(TaskStatus, { foreignKey: "statusId" });
  Task.belongsTo(User, { as: "assignor", foreignKey: "assignorId" });
  Task.belongsTo(User, { as: "assignee", foreignKey: "assigneeId" });

  User.hasMany(Task, { as: "assignedTasks", foreignKey: "assigneeId" });
  User.hasMany(Task, { as: "createdTasks", foreignKey: "assignorId" });
};
