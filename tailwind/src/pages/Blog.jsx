import { useState } from "react";
import { Calendar, User, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Blog() {
  const navigate = useNavigate();

  const [blogs] = useState([
    {
      id: 1,
      title: "How to Stay Productive Every Day",
      short: "Boost your productivity with simple daily habits.",
      content:
        "Staying productive requires planning, focus, and discipline. Start your day with clear goals, avoid distractions, and use tools like task managers. Break tasks into smaller chunks and take regular breaks to maintain energy.",
      author: "Azardeen",
      date: "2026-04-10",
      image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
    },
    {
      id: 2,
      title: "Top 5 Task Management Tips",
      short: "Master your workflow with these tips.",
      content:
        "Task management is essential for success. Prioritize your work, use digital tools, track progress, and review tasks regularly. Focus on completing high-impact tasks first.",
      author: "Azardeen",
      date: "2026-04-12",
      image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
    },
    {
  id: 3,
  title: "Time Management Techniques for Students",
  short: "Learn how to manage your time effectively as a student.",
  content:
    "Time management is crucial for students to balance studies, assignments, and personal life. Start by creating a daily schedule and sticking to it. Avoid procrastination and prioritize important subjects. Break study sessions into smaller intervals and take short breaks to stay focused. Using planners or digital apps can help you track deadlines and stay organized. Consistency and discipline are key to mastering time management.",
  author: "Azardeen",
  date: "2026-04-14",
  image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
},
{
  id: 4,
  title: "Why Consistency is More Important Than Motivation",
  short: "Discover why consistency beats motivation every time.",
  content:
    "Motivation can help you start, but consistency keeps you going. Relying only on motivation is risky because it fluctuates. Instead, build habits and routines that make progress automatic. Even small daily efforts can lead to big results over time. Focus on showing up every day, even when you don’t feel like it. Consistency builds discipline, and discipline leads to success.",
  author: "Azardeen",
  date: "2026-04-15",
  image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
},
{
  id: 5,
  title: "Best Tools for Task Management in 2026",
  short: "Explore the top tools to manage your daily tasks.",
  content:
    "There are many tools available to help you manage tasks efficiently. Popular tools like Notion, Trello, and Todoist provide features such as task tracking, reminders, and collaboration. Choosing the right tool depends on your workflow and needs. Some tools are better for teams, while others are great for personal use. Experiment with different options and choose one that fits your style.",
  author: "Azardeen",
  date: "2026-04-16",
  image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
}
  ]);

  return (
    <div className="p-6 bg-[#F5F7FB] min-h-screen">
      <h1 className="text-3xl font-bold mb-6">📝 Blog</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div key={blog.id} className="bg-white rounded-xl shadow overflow-hidden">
            
            <img src={blog.image} className="h-40 w-full object-cover" />

            <div className="p-4">
              <h2 className="font-semibold text-lg">{blog.title}</h2>
              <p className="text-sm text-gray-500 mt-2">{blog.short}</p>

              <button
                onClick={() => navigate(`/blog/${blog.id}`)}
                className="mt-4 flex items-center gap-2 text-blue-600"
              >
                Read More <ArrowRight size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}