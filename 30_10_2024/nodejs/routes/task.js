const express = require("express");
const router = express.Router();

const { taskController } = require("../controllers/task");
const auth = require("../middleware/auth");

// use middleware for all routes

// Task routes
router.post("/", taskController.createTask);
router.get("/", taskController.getTasks);
router.get("/task-priorities", taskController.getTaskPriorities);
router.get("/task-statuses", taskController.getTaskStatuses);
router.get("/:id", taskController.getTaskById);
router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

module.exports = router;
