const express = require("express");

const {
  getTasksCount,
  getTasks,
  getTaskById,
  deleteTask,
  createTask,
  editTask,
} = require("../controllers/task.controller");

const router = express.Router();
router.get("/count", getTasksCount);
router.get("/", getTasks);
router.get("/:id", getTaskById);
router.delete("/:id", deleteTask);
router.post("/", createTask);
router.patch("/:id", editTask);

module.exports = router;
