const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db.js");

const TaskPriority = sequelize.define("TaskPriority", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  }, {
    timestamps: false,
    tableName: 'task_priorities'
  });

module.exports = TaskPriority;
