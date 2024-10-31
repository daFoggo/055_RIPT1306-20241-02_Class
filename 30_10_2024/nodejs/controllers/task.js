const { Task } = require("../models/task");
const { TaskPriority } = require("../models/taskPriority");
const { TaskStatus } = require("../models/taskStatus");
const { User } = require("../models/user");

const {
  validateRequiredFields,
  validateForeignKeys,
  buildQueryConditions,
  getPagination,
} = require("../helper/task");

const taskController = {
  // Get all tasks
  getTasks: async (req, res) => {
    try {
      const whereClause = buildQueryConditions(req.query);
      const { limit, offset } = getPagination(req.query.page, req.query.limit);

      const tasks = await Task.findAndCountAll({
        where: whereClause,
        include: [
          { model: TaskPriority },
          { model: TaskStatus },
          { model: User, as: "assignor" },
          { model: User, as: "assignee" },
        ],
        limit,
        offset,
        order: [["createdAt", "DESC"]],
      });

      return res.json({
        success: true,
        data: {
          tasks: tasks.rows,
          pagination: {
            total: tasks.count,
            currentPage: parseInt(req.query.page || 1),
            totalPages: Math.ceil(tasks.count / limit),
          },
        },
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Có lỗi khi lấy danh sách task",
        error: error.message,
      });
    }
  },

  // Create new task
  createTask: async (req, res) => {
    try {
      const validateFields = validateRequiredFields(req.body);
      if (!validateFields.isValid) {
        return res.status(400).json({
          success: false,
          message: validateFields.message,
        });
      }

      const validateFK = await validateForeignKeys(req.body);
      if (!validateFK.isValid) {
        return res.status(400).json({
          success: false,
          message: validateFK.message,
        });
      }

      const { title, description, dueDate, priorityId, statusId, assigneeId } =
        req.body;

      const task = await Task.create({
        title,
        description,
        dueDate: new Date(dueDate),
        priorityId,
        statusId,
        assignorId: req.user.id,
        assigneeId,
      });

      const taskWithDetails = await Task.findByPk(task.id, {
        include: [
          { model: TaskPriority },
          { model: TaskStatus },
          { model: User, as: "assignor" },
          { model: User, as: "assignee" },
        ],
      });

      return res.status(201).json({
        success: true,
        data: taskWithDetails,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Có lỗi khi tạo task",
        error: error.message,
      });
    }
  },

  // Get task by ID
  getTaskById: async (req, res) => {
    try {
      const task = await Task.findByPk(req.params.id, {
        include: [
          { model: TaskPriority },
          { model: TaskStatus },
          { model: User, as: "assignor" },
          { model: User, as: "assignee" },
        ],
      });

      if (!task) {
        return res.status(404).json({
          success: false,
          message: "Không tìm thấy task",
        });
      }

      return res.json({
        success: true,
        data: task,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Có lỗi khi tìm task",
        error: error.message,
      });
    }
  },

  // Update task
  updateTask: async (req, res) => {
    try {
      const task = await Task.findByPk(req.params.id);

      if (!task) {
        return res.status(404).json({
          success: false,
          message: "Không tìm thấy task",
        });
      }

      // Check owner
      if (req.user.id !== task.assignorId && req.user.id !== task.assigneeId) {
        return res.status(403).json({
          success: false,
          message: "Bạn Không có quyền cập nhật task này",
        });
      }

      // Validate
      const validateFields = validateRequiredFields(req.body);
      if (!validateFields.isValid) {
        return res.status(400).json({
          success: false,
          message: validateFields.message,
        });
      }

      const validateFK = await validateForeignKeys(req.body);
      if (!validateFK.isValid) {
        return res.status(400).json({
          success: false,
          message: validateFK.message,
        });
      }

      const { title, description, dueDate, priorityId, statusId, assigneeId } =
        req.body;

      await task.update({
        title,
        description,
        dueDate: new Date(dueDate),
        priorityId,
        statusId,
        assigneeId,
      });

      // information to show
      const updatedTask = await Task.findByPk(task.id, {
        include: [
          { model: TaskPriority },
          { model: TaskStatus },
          { model: User, as: "assignor" },
          { model: User, as: "assignee" },
        ],
      });

      return res.json({
        success: true,
        data: updatedTask,
      });

    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Có lỗi khi update task",
        error: error.message,
      });
    }
  },

  // Delete task
  deleteTask: async (req, res) => {
    try {
      const task = await Task.findByPk(req.params.id);

      if (!task) {
        return res.status(404).json({
          success: false,
          message: "Không tìm thấy task",
        });
      }

      // Check owner
      if (req.user.id !== task.assignorId) {
        return res.status(403).json({
          success: false,
          message: "Chỉ người tạo task mới có quyền xóa",
        });
      }

      await task.destroy();

      // information to show
      return res.json({
        success: true,
        message: "Xóa task thành công",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Có lỗi khi xóa task",
        error: error.message,
      });
    }
  },
};

module.exports = {
  taskController,
};
