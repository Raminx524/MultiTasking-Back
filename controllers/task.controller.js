const Task = require("../models/task.model");
const { buildCritiria } = require("../helpers/product.helper");

async function getTasksCount(req, res) {
  const { query } = req;
  const criteria = buildCritiria(query, req.userId);
  try {
    const count = await Task.countDocuments(criteria);
    res.status(200).json({ count });
  } catch (err) {
    console.log(
      "task.controller, getTaskCount. Error while getting Task count",
      err
    );
    res.status(500).json({ message: "Server error while getting Tasks count" });
  }
}

async function getTasks(req, res) {
  const { query } = req;
  const critiria = buildCritiria(query, req.userId);
  let page = query.page || 1;
  if (page < 1) page = 1;

  const limit = query.limit || 9;
  const startIndex = (page - 1) * limit || 0;
  try {
    const tasks = await Task.find(critiria).skip(startIndex).limit(limit);
    res.status(200).json(tasks);
  } catch (err) {
    console.log("task.controller, getTasks. Error while getting Task", err);
    res.status(500).json({ message: "Server error while getting Tasks" });
  }
}

async function getTaskById(req, res) {
  const { id } = req.params;
  try {
    const task = await Task.findById(id);
    res.status(200).json(task);
  } catch (err) {
    if (err.name === "CastError") {
      console.log(
        `task.controller, getTaskById. CastError! Task not found with id: ${id}`
      );
      return res.status(404).json({ message: "Task not found!" });
    }
    console.log(
      `task.controller, getTaskById. Error while getting Task with id: ${id}`
    );
    console.log(err);
    return res.status(500).json({ message: "Server error while getting task" });
  }
}

async function deleteTask(req, res) {
  const { id } = req.params;
  try {
    await Task.findByIdAndDelete(id);
    return res.status(200).json({ message: "Success, Task deleted!" });
  } catch (err) {
    if (err.name === "CastError") {
      console.log(
        `task.controller , deleteTask. Task not found with id: ${id}`
      );
      return res.status(404).json({ message: "Task not found!" });
    }
    console.log("task.controller, deleteTask. Error while deleting task!");
    console.log(err);
    return res
      .status(500)
      .json({ message: "Server error while deleting task!" });
  }
}

async function createTask(req, res) {
  try {
    const { userId } = req;
    const newTask = new Task({ ...req.body, user: userId });
    const savedTask = await newTask.save();
    return res.status(201).json(savedTask);
  } catch (err) {
    if (err.name === "ValidationError") {
      console.log(`task.controller , createTask. ${err.message}`);
      return res.status(400).json({ message: err.message });
    }
    console.log("task.controller, createTask. Error while creating task!");
    console.log(err);
    return res
      .status(500)
      .json({ message: "Server error while creating task!" });
  }
}

async function editTask(req, res) {
  const { id } = req.params;
  try {
    const updatedTask = await Task.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    return res.status(200).json(updatedTask);
  } catch (err) {
    if (err.name === "CastError") {
      console.log(
        `task.controller, editTask. CastError! Task not found with id: ${id}`,
        err
      );
      return res.status(404).json({ message: "Task not found" });
    } else if (err.name === "ValidationError") {
      console.log(`task.controller, updateTask. ${err.message}`);
      return res.status(400).json({ message: err.message });
    } else {
      console.log(`task.controller, updateTask. ${err}`);
      return res
        .status(500)
        .json({ message: "Server error while updating task" });
    }
  }
}

module.exports = {
  getTasksCount,
  getTasks,
  getTaskById,
  deleteTask,
  createTask,
  editTask,
};
