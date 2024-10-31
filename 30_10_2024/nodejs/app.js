const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { sequelize, connectDB } = require("./config/db");
const taskRoutes = require("./routes/task");
const userRoutes = require("./routes/user");

// load .env
dotenv.config();

// connect db
connectDB();

const app = express();

//middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
