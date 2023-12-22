import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  taskName: {
    type: String,
  },

  taskStatus: {
    type: String,
  },
  createdBy: {
    type: String,
    required: true,
  },
});

const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);

export default Task
