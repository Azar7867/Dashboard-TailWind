import { useEffect, useState } from "react";
import axios from "axios";
import { Clock, PlayCircle, CheckCircle } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Medium",
    dueDate: "",
    status:"in-progress"
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:5000/api/tasks");
    setTasks(res.data);
  };
const downloadPDF = () => {
  console.log("PDF button clicked"); // 👈 check in console

  const doc = new jsPDF();

  doc.text("Task List", 14, 15);

  const tableData = tasks.map((task) => [
    task.title,
    task.description,
    task.priority,
    task.status,
    task.dueDate,
  ]);

  autoTable(doc, {
    head: [["Title", "Description", "Priority", "Status", "Due Date"]],
    body: tableData,
    startY: 20,
  });

  doc.save("tasks.pdf");
};

const closeModal = () => {
  setShowModal(false);
  setEditingTask(null);
  setForm({
    title: "",
    description: "",
    priority: "Medium",
    dueDate: "",
    status: "in-progress"
  });
};
const handleSubmit = async (e) => {
  if (e) e.preventDefault(); // ✅ IMPORTANT

  try {
    if (editingTask) {
      await axios.put(
        `http://localhost:5000/api/tasks/${editingTask._id}`,
        form
      );
    } else {
      await axios.post("http://localhost:5000/api/tasks", form);
    }

    await fetchTasks();
    closeModal();

  } catch (error) {
    console.error("Error:", error);
  }
};
  return (
    <div className="bg-[#F5F7FB] min-h-screen p-6">

      {/* HEADER */}
     <div className="bg-white rounded-2xl shadow-sm p-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Daily Tasks
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage and track your everyday activities here.
          </p>
        </div>
        
        <div className="flex gap-3">
  <button
    onClick={downloadPDF}
    className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl shadow-md"
  >
    ⬇ Download PDF
  </button>

  <button
    onClick={() => {
      setEditingTask(null);
      setForm({
        title: "",
        description: "",
        priority: "Medium",
        dueDate: "",
        status: "in-progress",
      });
      setShowModal(true);
    }}
    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl shadow-md flex items-center gap-2"
  >
    + Add Task
  </button>
</div>
      </div>

      {/* SESSION CARD */}
      <div className="mt-6 bg-white rounded-2xl shadow-sm p-5 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
            <Clock size={18} className="text-gray-500" />
          </div>
          <div>
            <h2 className="font-medium text-gray-700">
              Session Inactive
            </h2>
            <p className="text-sm text-gray-400">
              Check in to start tracking tasks.
            </p>
          </div>
        </div>

        <button className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-5 py-2 rounded-xl shadow">
          ▶ START SESSION
        </button>
      </div>

      {/* TASK CARDS */}
      <div className="grid md:grid-cols-3 gap-6 mt-6">
  {tasks.map((task) => (
    <div
  key={task.id}
  onClick={() => {
    setEditingTask(task);
    setForm(task);
    setShowModal(true);
  }}
  className="bg-white rounded-[20px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 cursor-pointer hover:shadow-md transition"
>

      {/* STATUS BADGE */}
      <span
        className={`inline-block text-[12px] font-medium px-3 py-[5px] rounded-md ${
          task.status === "completed"
            ? "bg-[#D1FAE5] text-[#059669]"
            : "bg-[#DBEAFE] text-[#2563EB]"
        }`}
      >
        {task.status === "completed" ? "Completed" : "In Progress"}
      </span>

      {/* TITLE */}
      <h2 className="mt-4 text-[18px] font-semibold text-[#1E293B]">
        {task.title}
      </h2>

      {/* DESCRIPTION */}
      <p className="text-[14px] text-[#64748B] mt-2 leading-relaxed">
        {task.description}
      </p>

      {/* DIVIDER */}
      <div className="border-t border-gray-100 mt-5 pt-4 flex justify-between items-center">

        {/* DUE DATE */}
        <span className="text-[12px] bg-[#F1F5F9] text-[#64748B] px-3 py-1 rounded-md font-medium">
          Due: {task.dueDate}
        </span>

        {/* ICONS */}
        <div className="flex items-center gap-3">

          {/* CLOCK */}
          <div className="w-8 h-8 flex items-center justify-center rounded-full border border-[#FED7AA] bg-[#FFF7ED]">
            <Clock size={16} className="text-[#F59E0B]" />
          </div>

           {task.status === "completed" ? (
    <div className="w-8 h-8 flex items-center justify-center rounded-full border border-[#BBF7D0] bg-[#F0FDF4]">
      <CheckCircle size={16} className="text-[#22C55E]" />
    </div>
  ) : (
    <div className="w-8 h-8 flex items-center justify-center rounded-full border border-[#BFDBFE] bg-[#EFF6FF]">
      <PlayCircle size={16} className="text-[#3B82F6]" />
    </div>
  )}

        </div>
      </div>
    </div>
  ))}
</div>

      {/* MODAL */}
     {showModal && (
  <div
    onClick={closeModal}   // ✅ overlay click close
    className="fixed inset-0 bg-black/30 backdrop-blur-[2px] flex items-center justify-center z-50"
  >
    {/* MODAL BOX */}
    <div
      onClick={(e) => e.stopPropagation()}  // ✅ STOP BUBBLING
      onKeyDown={(e) => {
        if (e.key === "Enter") e.preventDefault();
      }}
      className="w-[460px] bg-white rounded-[22px] 
                 shadow-[0_25px_60px_rgba(0,0,0,0.25)] overflow-hidden"
    >

      {/* HEADER */}
      <div className="flex justify-between items-center px-6 py-5 border-b border-gray-200">
        <h2 className="text-[18px] font-semibold text-[#1E293B]">
          {editingTask ? "Edit Task" : "Create New Task"}
        </h2>
        <button
          onClick={closeModal}
          className="text-gray-400 hover:text-gray-600 text-xl"
        >
          ✕
        </button>
      </div>

      {/* BODY */}
      <div className="px-6 py-5 space-y-5">

        {/* TASK TITLE */}
        <div>
          <label className="text-[14px] font-medium text-[#334155]">
            Task Title
          </label>
          <input
            type="text"
            value={form.title}
            className="mt-2 w-full h-[44px] px-4 rounded-xl 
                       border border-gray-200 bg-[#F8FAFC]
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="text-[14px] font-medium text-[#334155]">
            Description
          </label>
          <textarea
            rows="4"
            value={form.description}
            className="mt-2 w-full px-4 py-3 rounded-xl 
                       border border-gray-200 bg-[#F8FAFC]
                       focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />
        </div>

        {/* STATUS */}
        <div>
          <label className="text-[14px] font-medium text-[#334155]">
            Status
          </label>
          <select
            value={form.status}
            className="mt-2 w-full h-[44px] px-4 rounded-xl 
                       border border-gray-200 bg-[#F8FAFC]"
            onChange={(e) =>
              setForm({ ...form, status: e.target.value })
            }
          >
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* PRIORITY + DATE */}
        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="text-[14px] font-medium text-[#334155]">
              Priority
            </label>
            <select
              value={form.priority}
              className="mt-2 w-full h-[44px] px-4 rounded-xl border border-gray-200 bg-[#F8FAFC]"
              onChange={(e) =>
                setForm({ ...form, priority: e.target.value })
              }
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className="w-1/2">
            <label className="text-[14px] font-medium text-[#334155]">
              Due Date
            </label>
            <input
              type="date"
              value={form.dueDate}
              className="mt-2 w-full h-[44px] px-4 rounded-xl border border-gray-200 bg-[#F8FAFC]"
              onChange={(e) =>
                setForm({ ...form, dueDate: e.target.value })
              }
            />
          </div>
        </div>

        {/* BUTTON */}
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full h-[48px] rounded-xl text-white text-[15px] font-medium
                     bg-gradient-to-r from-[#2563EB] to-[#3B82F6]
                     shadow-[0_10px_25px_rgba(37,99,235,0.35)]"
        >
          {editingTask ? "Update Task" : "Create Task"}
        </button>

      </div>
    </div>
  </div>
)}
    </div>
  );
}