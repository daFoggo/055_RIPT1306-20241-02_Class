const Task = require("../models/task");
const TaskPriority = require("../models/taskPriority");
const TaskStatus = require("../models/taskStatus"); 
const User = require("../models/user");
const { validateRequiredFields, validateForeignKeys, buildQueryConditions, getPagination } = require("../helper/task");

const taskController = {
  // Get all tasks 
  getTasks: async (req, res) => {
    try {
      const whereClause = buildQueryConditions(req.query);
      const { limit, offset } = getPagination(req.query.page, req.query.limit);

      const { rows: tasks, count } = await Task.findAndCountAll({
        where: whereClause,
        include: [
          { 
            model: TaskPriority,
            attributes: ['id', 'name'] 
          },
          {
            model: TaskStatus,
            attributes: ['id', 'name']
          },
          {
            model: User,
            as: "assignor",
            attributes: ['id', 'username'] 
          },
          {
            model: User,
            as: "assignee",
            attributes: ['id', 'username']
          }
        ],
        limit,
        offset,
        order: [["createdAt", "DESC"]],
        distinct: true 
      });

      return res.json({
        success: true,
        data: {
          tasks,
          pagination: {
            total: count,
            currentPage: parseInt(req.query.page || 1),
            totalPages: Math.ceil(count / limit),
          }
        }
      });

    } catch (error) {
      console.error("Error in getTasks:", error);
      return res.status(500).json({
        success: false,
        message: "Có lỗi khi lấy danh sách task",
        error: error.message
      });
    }
  },

  // Create task 
  createTask: async (req, res) => {
    const transaction = await Task.sequelize.transaction();
    
    try {
      // Validate input
      const validateFields = validateRequiredFields(req.body);
      if (!validateFields.isValid) {
        return res.status(400).json({
          success: false,
          message: validateFields.message
        });
      }

      const validateFK = await validateForeignKeys(req.body);
      if (!validateFK.isValid) {
        return res.status(400).json({
          success: false,
          message: validateFK.message
        });
      }

      const { title, description, dueDate, priorityId, statusId, assigneeId } = req.body;

      // Create task 
      const task = await Task.create({
        title,
        description,
        dueDate: new Date(dueDate),
        priorityId,
        statusId,
        assignorId: req.user.id,
        assigneeId
      }, { transaction });

      // Fetch task 
      const taskWithDetails = await Task.findByPk(task.id, {
        include: [
          { 
            model: TaskPriority,
            attributes: ['id', 'name']
          },
          {
            model: TaskStatus, 
            attributes: ['id', 'name']
          },
          {
            model: User,
            as: "assignor",
            attributes: ['id', 'username']
          },
          {
            model: User, 
            as: "assignee",
            attributes: ['id', 'username']
          }
        ],
        transaction
      });

      await transaction.commit();

      return res.status(201).json({
        success: true,
        data: taskWithDetails
      });

    } catch (error) {
      await transaction.rollback();
      console.error("Error in createTask:", error);
      return res.status(500).json({
        success: false, 
        message: "Có lỗi khi tạo task",
        error: error.message
      });
    }
  },

  // Get task by ID
  getTaskById: async (req, res) => {
    try {
      const task = await Task.findByPk(req.params.id, {
        include: [
          { 
            model: TaskPriority,
            attributes: ['id', 'name']
          },
          {
            model: TaskStatus,
            attributes: ['id', 'name']  
          },
          {
            model: User,
            as: "assignor",
            attributes: ['id', 'username']
          },
          {
            model: User,
            as: "assignee", 
            attributes: ['id', 'username']
          }
        ],
        rejectOnEmpty: true // Tự động throw error nếu không tìm thấy
      });

      return res.json({
        success: true,
        data: task
      });

    } catch (error) {
      console.error("Error in getTaskById:", error);
      if (error.name === 'SequelizeEmptyResultError') {
        return res.status(404).json({
          success: false,
          message: "Không tìm thấy task"
        });
      }
      return res.status(500).json({
        success: false,
        message: "Có lỗi khi tìm task",
        error: error.message
      });
    }
  },

  // Update task với validation và authorization
  updateTask: async (req, res) => {
    const transaction = await Task.sequelize.transaction();
    
    try {
      const task = await Task.findByPk(req.params.id);
      if (!task) {
        return res.status(404).json({
          success: false,
          message: "Không tìm thấy task"
        });
      }

      // Authorization check
      if (req.user.id !== task.assignorId && req.user.id !== task.assigneeId) {
        return res.status(403).json({
          success: false,
          message: "Bạn không có quyền cập nhật task này"
        });
      }

      // Validation
      const validateFields = validateRequiredFields(req.body);
      if (!validateFields.isValid) {
        return res.status(400).json({
          success: false,
          message: validateFields.message
        });
      }

      const validateFK = await validateForeignKeys(req.body);
      if (!validateFK.isValid) {
        return res.status(400).json({
          success: false,
          message: validateFK.message
        });
      }

      const { title, description, dueDate, priorityId, statusId, assigneeId } = req.body;

      await task.update({
        title,
        description, 
        dueDate: new Date(dueDate),
        priorityId,
        statusId,
        assigneeId
      }, { transaction });

      const updatedTask = await Task.findByPk(task.id, {
        include: [
          {
            model: TaskPriority,
            attributes: ['id', 'name']
          },
          {
            model: TaskStatus,
            attributes: ['id', 'name']
          },
          {
            model: User,
            as: "assignor",
            attributes: ['id', 'username'] 
          },
          {
            model: User,
            as: "assignee",
            attributes: ['id', 'username']
          }
        ],
        transaction
      });

      await transaction.commit();

      return res.json({
        success: true,
        data: updatedTask
      });

    } catch (error) {
      await transaction.rollback();
      console.error("Error in updateTask:", error);
      return res.status(500).json({
        success: false,
        message: "Có lỗi khi cập nhật task",
        error: error.message
      });
    }
  },

  // Delete task 
  deleteTask: async (req, res) => {
    const transaction = await Task.sequelize.transaction();
    
    try {
      const task = await Task.findByPk(req.params.id);
      if (!task) {
        return res.status(404).json({
          success: false,
          message: "Không tìm thấy task"
        });
      }

      // Authorization check
      if (req.user.id !== task.assignorId) {
        return res.status(403).json({
          success: false,
          message: "Chỉ người tạo task mới có quyền xóa"
        });
      }

      await task.destroy({ transaction });
      await transaction.commit();

      return res.json({
        success: true,
        message: "Xóa task thành công"
      });

    } catch (error) {
      await transaction.rollback();
      console.error("Error in deleteTask:", error);
      return res.status(500).json({
        success: false,
        message: "Có lỗi khi xóa task",
        error: error.message
      });
    }
  },

  // Get task priorities
  getTaskPriorities: async (req, res) => {
    try {
      const priorities = await TaskPriority.findAll({
        attributes: ['id', 'name'],
        order: [['id', 'ASC']]
      });

      return res.json({
        success: true,
        data: priorities
      });

    } catch (error) {
      console.error("Error in getTaskPriorities:", error);
      return res.status(500).json({
        success: false,
        message: "Có lỗi khi lấy danh sách mức độ ưu tiên",
        error: error.message
      });
    }
  },

  // Get task statuses 
  getTaskStatuses: async (req, res) => {
    try {
      const statuses = await TaskStatus.findAll({
        attributes: ['id', 'name'],
        order: [['id', 'ASC']] 
      });

      return res.json({
        success: true,
        data: statuses
      });

    } catch (error) {
      console.error("Error in getTaskStatuses:", error);
      return res.status(500).json({
        success: false,
        message: "Có lỗi khi lấy danh sách trạng thái",
        error: error.message
      });
    }
  }
};

module.exports = {
  taskController
};