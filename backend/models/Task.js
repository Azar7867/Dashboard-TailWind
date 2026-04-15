import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Medium"
  },
  status: {
    type: String,
    enum: ["in-progress", "completed"],
    default: "in-progress"
  },
  dueDate: String
}, { timestamps: true });

export default mongoose.model("Task", taskSchema);