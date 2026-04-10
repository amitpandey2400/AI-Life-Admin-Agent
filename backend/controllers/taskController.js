const Task = require("../models/Task");
const logger = require("../utils/logger");

// @desc    Get all tasks for user
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    logger.error("Get tasks error:", error.message);
    next(error);
  }
};

// @desc    Get single task
// @route   GET /api/tasks/:id
// @access  Private
const getTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    // Check authorization
    if (task.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    logger.error("Get task error:", error.message);
    next(error);
  }
};

// @desc    Create new task
// @route   POST /api/tasks
// @access  Private
const createTask = async (req, res, next) => {
  try {
    const { title, description, priority, dueDate, category } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Please provide a task title",
      });
    }

    const task = await Task.create({
      userId: req.user.id,
      title,
      description,
      priority: priority || "medium",
      dueDate,
      category: category || "general",
    });

    logger.info("Task created:", task._id);

    res.status(201).json({
      success: true,
      data: task,
    });
  } catch (error) {
    logger.error("Create task error:", error.message);
    next(error);
  }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res, next) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    // Check authorization
    if (task.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    // Update fields
    const { title, description, completed, priority, dueDate, category } =
      req.body;

    if (title) task.title = title;
    if (description) task.description = description;
    if (completed !== undefined) task.completed = completed;
    if (priority) task.priority = priority;
    if (dueDate) task.dueDate = dueDate;
    if (category) task.category = category;

    task = await task.save();

    logger.info("Task updated:", task._id);

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    logger.error("Update task error:", error.message);
    next(error);
  }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    // Check authorization
    if (task.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    await Task.findByIdAndDelete(req.params.id);

    logger.info("Task deleted:", req.params.id);

    res.status(200).json({
      success: true,
      message: "Task deleted",
    });
  } catch (error) {
    logger.error("Delete task error:", error.message);
    next(error);
  }
};

module.exports = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
