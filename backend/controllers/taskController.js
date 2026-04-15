import Task from "../models/Task.js";

// GET ALL
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Invalid ID" });
  }
};
// CREATE
export const createTask = async (req, res) => {
  try {
    const { title, description, priority, status, dueDate } = req.body;

    // 🔥 validation (important)
    if (!title || !description) {
      return res.status(400).json({ message: "Title and Description required" });
    }

    const task = new Task({
      title,
      description,
      priority,
      status,
      dueDate
    });

    const savedTask = await task.save();

    res.status(201).json(savedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE
export const updateTask = async (req, res) => {
  try {
    const { title, description, priority, status, dueDate } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        priority,
        status,
        dueDate
      },
    //   { new: true }
    { returnDocument: "after" }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE
export const deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};