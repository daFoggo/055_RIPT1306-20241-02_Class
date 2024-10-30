const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const todoRoutes = require("./routes/Todo/todo");
const { errorHandler } = require("./middleware/errorHandler");

// load .env
dotenv.config();

// connect mongo
connectDB();

// init express app
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(errorHandler);

// routes
app.use("/api/todo", todoRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
