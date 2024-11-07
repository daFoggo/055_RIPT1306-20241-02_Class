const express = require("express");
const router = express.Router();

const { taskController } = require("../controllers/task");
const auth = require("../middleware/auth");

// use middleware for all routes
router.use(auth);

// Task routes
router.post("/create-task", taskController.createTask);
router.get("/get-all-task/", taskController.getTasks);
router.get("/task-priorities", taskController.getTaskPriorities);
router.get("/task-statuses", taskController.getTaskStatuses);
router.get("/:id", taskController.getTaskById);
router.put("/update-task/:id", taskController.updateTask);
router.delete("/delete-task/:id", taskController.deleteTask);

module.exports = router;
