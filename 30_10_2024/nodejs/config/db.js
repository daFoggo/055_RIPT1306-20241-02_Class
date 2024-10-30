const mysql = require("mysql2");
const dotenv = require("dotenv");

// load .env
dotenv.config();

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

const connectDB = async () => {
  try {
    const conn = await db.connect();
    console.log(`MySQL connected: ${conn.threadId}`);
  } catch (error) {
    console.error("Error when connecting to database:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
