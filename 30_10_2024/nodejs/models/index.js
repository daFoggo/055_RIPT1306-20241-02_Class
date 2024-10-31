const { sequelize } = require("../config/db.js");
const { Task } = require("./task");
const { User } = require("./user");
const { TaskPriority } = require("./taskPriority");
const { TaskStatus } = require("./taskStatus");

Task.associateTask({ User, TaskPriority, TaskStatus });

module.exports = {
  Task,
  User,
  TaskPriority,
  TaskStatus,
  sequelize,
};
