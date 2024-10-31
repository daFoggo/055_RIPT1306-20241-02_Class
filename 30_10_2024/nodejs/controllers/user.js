const { Task } = require("../models/task");
const { User } = require("../models/user");
const { Op } = require("sequelize");

const {
  validateRegisterInput,
  hashPassword,
  comparePassword,
  generateToken,
} = require("../helper/user");

const userController = {
  // Register
  register: async (req, res) => {
    try {
      // Validate input
      const validateInput = validateRegisterInput(req.body);
      if (!validateInput.isValid) {
        return res.status(400).json({
          success: false,
          message: validateInput.message,
        });
      }

      const { username, email, password, fullName } = req.body;

      // Check db if user exited
      const existingUser = await User.findOne({
        where: {
          [Op.or]: [{ username }, { email }],
        },
      });

      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Username hoặc email đã tồn tại",
        });
      }

      // Hash password
      const hashedPassword = await hashPassword(password);

      // Create user
      const user = await User.create({
        username,
        email,
        password: hashedPassword,
        fullName,
      });

      // Gen jwt
      const token = generateToken(user.id);

      return res.status(201).json({
        success: true,
        data: {
          id: user.id,
          username: user.username,
          email: user.email,
          fullName: user.fullName,
        },
        token,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Lỗi server",
        error: error.message,
      });
    }
  },

  // Login
  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      // Check if user exists
      const user = await User.findOne({
        where: {
          [Op.or]: [
            // login with username or email
            { username },
            { email: username }, 
          ],
        },
      });

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Thông tin đăng nhập không chính xác",
        });
      }

      // Verify password
      const isPasswordValid = await comparePassword(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: "Thông tin đăng nhập không chính xác",
        });
      }

      // Gen jwt
      const token = generateToken(user.id);

      return res.json({
        success: true,
        data: {
          id: user.id,
          username: user.username,
          email: user.email,
          fullName: user.fullName,
        },
        token,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Lỗi server",
        error: error.message,
      });
    }
  },


  // Get user profile info
  getProfile: async (req, res) => {
    try {
      const user = await User.findByPk(req.user.id, {
        attributes: { exclude: ["password"] },
      });

      return res.json({
        success: true,
        data: user,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Lỗi server",
        error: error.message,
      });
    }
  },

  // Update user info
  updateProfile: async (req, res) => {
    try {
      const { email, fullName, currentPassword, newPassword } = req.body;
      const user = await User.findByPk(req.user.id);

      // If updating email, check if email already exists
      if (email && email !== user.email) {
        const existingEmail = await User.findOne({ where: { email } });
        if (existingEmail) {
          return res.status(400).json({
            success: false,
            message: "Email đã tồn tại",
          });
        }
      }

      // If updating password, verify current password
      if (newPassword) {
        if (!currentPassword) {
          return res.status(400).json({
            success: false,
            message: "Vui lòng nhập mật khẩu hiện tại",
          });
        }

        const isPasswordValid = await comparePassword(
          currentPassword,
          user.password
        );
        if (!isPasswordValid) {
          return res.status(401).json({
            success: false,
            message: "Mật khẩu hiện tại không chính xác",
          });
        }

        // Hash new password
        const hashedPassword = await hashPassword(newPassword);
        await user.update({ password: hashedPassword });
      }

      // Update other fields
      if (email || fullName) {
        await user.update({
          email: email || user.email,
          fullName: fullName || user.fullName,
        });
      }

      const updatedUser = await User.findByPk(user.id, {
        attributes: { exclude: ["password"] },
      });

      return res.json({
        success: true,
        data: updatedUser,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Lỗi server",
        error: error.message,
      });
    }
  },

  // Get user statistics
  getUserStats: async (req, res) => {
    try {
      const completedTasks = await Task.count({
        where: {
          assigneeId: req.user.id,
          statusId: 3, // Assuming 3 is the ID for 'Completed' status
        },
      });

      const incompleteTasks = await Task.count({
        where: {
          assigneeId: req.user.id,
          statusId: { [Op.ne]: 3 }, // Not 'Completed' status
        },
      });

      return res.json({
        success: true,
        data: {
          completedTasks,
          incompleteTasks,
          totalTasks: completedTasks + incompleteTasks,
        },
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Lỗi server",
        error: error.message,
      });
    }
  },

};

module.exports = {
  userController,
};
