const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { sequelize, connectDB } = require("./config/db");
const todoRoutes = require("./routes/Todo/todo");

// load .env
dotenv.config();

// connect db
connectDB();

const app = express();

//middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/todo", todoRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
