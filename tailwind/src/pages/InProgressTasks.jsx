// import { useEffect, useState } from "react";
// import axios from "axios";
// import { PlayCircle, CheckCircle } from "lucide-react";

// export default function InProgressTasks() {
//   const [tasks, setTasks] = useState([]);

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   const fetchTasks = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/tasks");

//       const progressTasks = res.data.filter(
//         (task) => task.status === "in-progress"
//       );

//       setTasks(progressTasks);
//     } catch (error) {
//       console.error("Error fetching tasks:", error);
//     }
//   };

//   // ✅ MARK AS COMPLETED
//   const completeTask = async (task) => {
//     try {
//       await axios.put(
//         `http://localhost:5000/api/tasks/${task._id}`,
//         {
//           ...task,
//           status: "completed",
//         }
//       );

//       // 🔥 remove from UI instantly
//       setTasks((prev) => prev.filter((t) => t._id !== task._id));

//     } catch (error) {
//       console.error("Error completing task:", error);
//     }
//   };

//   return (
//     <div className="p-6 bg-[#F5F7FB] min-h-screen">

//       {/* HEADER */}
//       <h1 className="text-2xl font-semibold mb-6 text-blue-600">
//         🔵 In Progress Tasks
//       </h1>

//       {/* TASK LIST */}
//       <div className="grid md:grid-cols-3 gap-6">
//         {tasks.length === 0 ? (
//           <p className="text-gray-400">No in-progress tasks</p>
//         ) : (
//           tasks.map((task) => (
//             <div
//               key={task._id}
//               className="bg-white p-5 rounded-xl shadow hover:shadow-md transition"
//             >
//               {/* TITLE */}
//               <h2 className="font-semibold text-lg text-gray-800">
//                 {task.title}
//               </h2>

//               {/* DESCRIPTION */}
//               <p className="text-sm text-gray-500 mt-2">
//                 {task.description}
//               </p>

//               {/* FOOTER */}
//               <div className="mt-4 flex justify-between items-center">

//                 {/* DATE */}
//                 <span className="text-xs text-gray-400">
//                   Due: {task.dueDate}
//                 </span>

//                 {/* ICONS */}
//                 <div className="flex items-center gap-3">

//                   {/* 🔵 IN PROGRESS ICON (DISPLAY ONLY) */}
//                   <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100">
//                     <PlayCircle className="text-blue-500" size={16} />
//                   </div>

//                   {/* ✅ COMPLETE BUTTON */}
//                   <div
//                     onClick={() => completeTask(task)}
//                     className="w-8 h-8 flex items-center justify-center rounded-full bg-green-100 cursor-pointer hover:scale-110 transition"
//                     title="Mark as Completed"
//                   >
//                     <CheckCircle className="text-green-500" size={16} />
//                   </div>

//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import axios from "axios";
import { PlayCircle, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function InProgressTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tasks");

      const progressTasks = res.data.filter(
        (task) => task.status === "in-progress"
      );

      setTasks(progressTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // ✅ MARK AS COMPLETED
  const completeTask = async (task) => {
    try {
      await axios.put(
        `http://localhost:5000/api/tasks/${task._id}`,
        {
          status: "completed", // ✅ FIXED
        }
      );

      // toast.success("Task marked as completed ✅");

      // ✅ Refresh data
      fetchTasks();

    } catch (error) {
      console.error("Error completing task:", error);
      toast.error("Failed to update task ❌");
    }
  };

  return (
    <div className="p-6 bg-[#F5F7FB] min-h-screen">

      {/* HEADER */}
      <h1 className="text-2xl font-semibold mb-6 text-blue-600">
        🔵 In Progress Tasks
      </h1>

      {/* TASK LIST */}
      <div className="grid md:grid-cols-3 gap-6">
        {tasks.length === 0 ? (
          <p className="text-gray-400">No in-progress tasks</p>
        ) : (
          tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-lg transition"
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

                  {/* 🔵 IN PROGRESS */}
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100">
                    <PlayCircle className="text-blue-500" size={16} />
                  </div>

                  {/* ✅ COMPLETE */}
                  <div
                    onClick={() => completeTask(task)}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-green-100 cursor-pointer hover:scale-110 transition"
                    title="Mark as Completed"
                  >
                    <CheckCircle className="text-green-500" size={16} />
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