const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const app = express();
const port = 3000;

// load .env
dotenv.config();

// connect db
connectDB();

//middleware
app.use(cors())
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
