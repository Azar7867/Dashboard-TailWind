import { useEffect, useState } from "react";
import axios from "axios";
import { CheckCircle, RotateCcw } from "lucide-react";

export default function CompletedTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  // ✅ FETCH COMPLETED TASKS
  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tasks");

      const completedTasks = res.data.filter(
        (task) => task.status === "completed"
      );

      setTasks(completedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // 🔄 REOPEN TASK
  const reopenTask = async (task) => {
    try {
      await axios.put(
        `http://localhost:5000/api/tasks/${task._id}`,
        {
          ...task,
          status: "in-progress",
        }
      );

      // remove from UI instantly
      setTasks((prev) => prev.filter((t) => t._id !== task._id));

    } catch (error) {
      console.error("Error reopening task:", error);
    }
  };

  return (
    <div className="p-6 bg-[#F5F7FB] min-h-screen">
      
      {/* HEADER */}
      <h1 className="text-2xl font-semibold mb-6 text-green-600">
        ✅ Completed Tasks
      </h1>

      {/* TASK LIST */}
      <div className="grid md:grid-cols-3 gap-6">
        {tasks.length === 0 ? (
          <p className="text-gray-400">No completed tasks</p>
        ) : (
          tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white p-5 rounded-xl shadow hover:shadow-md transition"
            >
              {/* TITLE */}
              <h2 className="font-semibold text-lg text-gray-800">
                {task.title}
              </h2>

              {/* DESCRIPTION */}
              <p className="text-sm text-gray-500 mt-2">
                {task.description}
              </p>

              {/* FOOTER */}
              <div className="mt-4 flex justify-between items-center">

                {/* DATE */}
                <span className="text-xs text-gray-400">
                  Due: {task.dueDate}
                </span>

                {/* ICONS */}
                <div className="flex items-center gap-3">

                  {/* ✅ COMPLETED ICON (ONLY DISPLAY) */}
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-green-100">
                    <CheckCircle className="text-green-500" size={16} />
                  </div>

                  {/* 🔄 REOPEN ICON (CLICKABLE) */}
                  <div
                    onClick={() => reopenTask(task)}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 cursor-pointer hover:scale-110 transition"
                  >
                    <RotateCcw className="text-blue-500" size={16} />
                  </div>

                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}