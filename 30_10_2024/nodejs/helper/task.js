const { Op } = require("sequelize");
const  User  = require("../models/user");
const  TaskPriority  = require("../models/taskPriority");
const  TaskStatus  = require("../models/taskStatus");

// Validate required fields
const validateRequiredFields = (data) => {
  const { title, dueDate, priorityId, statusId, assigneeId } = data;
  if (!title || !dueDate || !priorityId || !statusId || !assigneeId) {
    return {
      isValid: false,
      message: "Vui lòng điền đầy đủ thông tin bắt buộc",
    };
  }
  return { isValid: true };
};

// Validate foreign keys
const validateForeignKeys = async (data) => {
  const { priorityId, statusId, assigneeId } = data;

  try {
    const priority = await TaskPriority.findByPk(priorityId);
    if (!priority) {
      return {
        isValid: false,
        message: "Độ ưu tiên không hợp lệ",
      };
    }

    const status = await TaskStatus.findByPk(statusId);
    if (!status) {
      return {
        isValid: false,
        message: "Trạng thái không hợp lệ",
      };
    }

    const assignee = await User.findByPk(assigneeId);
    if (!assignee) {
      return {
        isValid: false,
        message: "Người được giao không tồn tại",
      };
    }

    return { isValid: true };
  } catch (error) {
    return {
      isValid: false,
      message: "Lỗi khi kiểm tra dữ liệu",
      error,
    };
  }
};

// Find task with information
const buildQueryConditions = (queryParams) => {
  const { status, priority, assigneeId, search } = queryParams;
  const whereClause = {};

  if (status) whereClause.statusId = status;
  if (priority) whereClause.priorityId = priority;
  if (assigneeId) whereClause.assigneeId = assigneeId;
  if (search) {
    whereClause[Op.or] = [
      { title: { [Op.like]: `%${search}%` } },
      { description: { [Op.like]: `%${search}%` } },
    ];
  }

  return whereClause;
};

// Get pagination
const getPagination = (page = 1, limit = 10) => {
  const offset = (page - 1) * limit;
  return {
    limit: parseInt(limit),
    offset,
  };
};

module.exports = {
  validateRequiredFields,
  validateForeignKeys,
  buildQueryConditions,
  getPagination,
};
