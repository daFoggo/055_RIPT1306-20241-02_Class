const {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("../../controllers/Todo/todo");
const express = require("express");
const router = express.Router();

router.get("/getAllTodo", getTodos);
router.post("/createTodo", createTodo);
router.put("/updateTodo/:id", updateTodo);
router.delete("/deleteTodo/:id", deleteTodo);

module.exports = router;
