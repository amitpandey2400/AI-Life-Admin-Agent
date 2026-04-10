const Reminder = require("../models/Reminder");
const logger = require("../utils/logger");

// @desc    Get all reminders for user
// @route   GET /api/reminders
// @access  Private
const getReminders = async (req, res, next) => {
  try {
    const reminders = await Reminder.find({ userId: req.user.id }).sort({
      date: 1,
    });

    res.status(200).json({
      success: true,
      count: reminders.length,
      data: reminders,
    });
  } catch (error) {
    logger.error("Get reminders error:", error.message);
    next(error);
  }
};

// @desc    Get single reminder
// @route   GET /api/reminders/:id
// @access  Private
const getReminder = async (req, res, next) => {
  try {
    const reminder = await Reminder.findById(req.params.id);

    if (!reminder) {
      return res.status(404).json({
        success: false,
        message: "Reminder not found",
      });
    }

    // Check authorization
    if (reminder.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    res.status(200).json({
      success: true,
      data: reminder,
    });
  } catch (error) {
    logger.error("Get reminder error:", error.message);
    next(error);
  }
};

// @desc    Create new reminder
// @route   POST /api/reminders
// @access  Private
const createReminder = async (req, res, next) => {
  try {
    const { title, description, date, priority } = req.body;

    if (!title || !date) {
      return res.status(400).json({
        success: false,
        message: "Please provide title and date",
      });
    }

    const reminder = await Reminder.create({
      userId: req.user.id,
      title,
      description,
      date,
      priority: priority || "medium",
    });

    logger.info("Reminder created:", reminder._id);

    res.status(201).json({
      success: true,
      data: reminder,
    });
  } catch (error) {
    logger.error("Create reminder error:", error.message);
    next(error);
  }
};

// @desc    Update reminder
// @route   PUT /api/reminders/:id
// @access  Private
const updateReminder = async (req, res, next) => {
  try {
    let reminder = await Reminder.findById(req.params.id);

    if (!reminder) {
      return res.status(404).json({
        success: false,
        message: "Reminder not found",
      });
    }

    // Check authorization
    if (reminder.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    // Update fields
    const { title, description, date, notified, priority } = req.body;

    if (title) reminder.title = title;
    if (description) reminder.description = description;
    if (date) reminder.date = date;
    if (notified !== undefined) reminder.notified = notified;
    if (priority) reminder.priority = priority;

    reminder = await reminder.save();

    logger.info("Reminder updated:", reminder._id);

    res.status(200).json({
      success: true,
      data: reminder,
    });
  } catch (error) {
    logger.error("Update reminder error:", error.message);
    next(error);
  }
};

// @desc    Delete reminder
// @route   DELETE /api/reminders/:id
// @access  Private
const deleteReminder = async (req, res, next) => {
  try {
    const reminder = await Reminder.findById(req.params.id);

    if (!reminder) {
      return res.status(404).json({
        success: false,
        message: "Reminder not found",
      });
    }

    // Check authorization
    if (reminder.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    await Reminder.findByIdAndDelete(req.params.id);

    logger.info("Reminder deleted:", req.params.id);

    res.status(200).json({
      success: true,
      message: "Reminder deleted",
    });
  } catch (error) {
    logger.error("Delete reminder error:", error.message);
    next(error);
  }
};

module.exports = {
  getReminders,
  getReminder,
  createReminder,
  updateReminder,
  deleteReminder,
};
