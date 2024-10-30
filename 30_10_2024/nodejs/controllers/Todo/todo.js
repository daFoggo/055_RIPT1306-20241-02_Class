const Todo = require("../../models/Todo");

const getTodos = async (req, res) => {
  try {
    const todos = await Todo.findAll();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

const createTodo = async (req, res) => {
  const { title, description, due_date } = req.body;
  try {
    const newTodo = await Todo.create({ title, description, due_date });
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findByPk(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    await todo.update(req.body);
    res.json(todo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByPk(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    await todo.destroy();
    res.json({ message: "Todo deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = { getTodos, createTodo, updateTodo, deleteTodo };