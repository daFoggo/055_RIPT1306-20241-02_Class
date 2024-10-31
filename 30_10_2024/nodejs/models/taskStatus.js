const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db.js");

const TaskStatus = sequelize.define(
  "TaskStatus",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    timestamps: false,
    tableName: "task_statuses",
  }
);

module.exports = {TaskStatus};
