const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

// Validate user input for registration
const validateRegisterInput = (data) => {
  const { username, email, password, fullName } = data;

  if (!username || !email || !password) {
    return {
      isValid: false,
      message: "Vui lòng điền đầy đủ thông tin bắt buộc",
    };
  }

  // regex for email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      isValid: false,
      message: "Email không hợp lệ",
    };
  }

  // Validate password strength
  if (password.length < 6) {
    return {
      isValid: false,
      message: "Mật khẩu phải có ít nhất 6 ký tự",
    };
  }

  return { isValid: true };
};

// Hash password
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// Compare password
const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

// Gen JWT
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "24h" });
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
  validateRegisterInput,
  hashPassword,
  comparePassword,
  generateToken,
  buildUserQueryConditions,
  getPagination,
};
