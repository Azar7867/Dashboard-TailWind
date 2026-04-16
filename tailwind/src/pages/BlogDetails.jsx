import { useParams, useNavigate } from "react-router-dom";

export default function BlogDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const blogs = [
  {
    id: 1,
    title: "How to Stay Productive Every Day",
    content: `
Staying productive is not about working harder, but working smarter. It starts with having a clear plan for your day. Begin each morning by listing your top priorities and focusing on the most important tasks first.

One of the biggest challenges in productivity is avoiding distractions. Social media, unnecessary meetings, and multitasking can reduce your efficiency. Try using techniques like the Pomodoro method, where you work in focused intervals followed by short breaks.

Another key aspect is maintaining a healthy work-life balance. Overworking can lead to burnout, which reduces long-term productivity. Make sure to take proper breaks, stay hydrated, and get enough sleep.

Using digital tools like task managers, calendars, and reminders can significantly improve your workflow. These tools help you stay organized and ensure nothing is missed.

Finally, always review your day. Reflect on what you achieved and identify areas for improvement. Consistency and self-discipline are the true keys to staying productive every day.
    `,
    image:
      "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
  },
  {
    id: 2,
    title: "Top 5 Task Management Tips",
    content: `
Task management is an essential skill for both personal and professional success. Without proper organization, tasks can pile up and become overwhelming.

The first tip is to prioritize tasks based on importance and urgency. Focus on high-impact tasks that contribute the most value. Avoid spending too much time on low-priority activities.

Second, break large tasks into smaller, manageable steps. This makes the work less intimidating and easier to complete. It also gives you a sense of progress as you complete each step.

Third, use tools like Trello, Notion, or simple to-do lists to keep track of your tasks. These tools help you visualize your work and stay organized.

Fourth, set realistic deadlines. Overcommitting can lead to stress and missed deadlines. Always plan your time wisely.

Finally, review and update your task list regularly. Remove completed tasks and adjust priorities as needed. This keeps your workflow clean and efficient.
    `,
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
  },
  {
  id: 3,
  title: "Time Management Techniques for Students",
  short: "Simple strategies to manage time effectively and reduce stress.",
  content: `
Time management is one of the most important skills every student should develop. Without proper planning, it becomes difficult to balance studies, assignments, and personal life.

Start by creating a daily or weekly schedule. Allocate time for each subject and make sure to include breaks to avoid burnout. A structured routine helps you stay consistent and focused.

Avoid procrastination by breaking large tasks into smaller, manageable parts. Completing small tasks gives a sense of achievement and keeps you motivated.

Using tools like calendars, reminders, or task management apps can help you stay organized. These tools ensure you never miss deadlines.

Finally, review your progress regularly. Adjust your schedule if needed and always aim for improvement. Consistency is the key to mastering time management.
  `,
  author: "Azardeen",
  date: "2026-04-14",
  image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
},
{
  id: 4,
  title: "Why Consistency is More Important Than Motivation",
  short: "Understand why daily habits matter more than temporary motivation.",
  content: `
Many people rely on motivation to get started, but motivation does not last forever. It comes and goes depending on mood and circumstances.

Consistency, on the other hand, builds long-term success. When you develop daily habits, you don’t need to rely on motivation. Your actions become automatic.

Even small efforts done consistently can lead to big results. For example, studying one hour every day is more effective than studying for 10 hours once a week.

Discipline plays a major role in consistency. Train yourself to show up every day, even when you don’t feel like it.

In the long run, consistency creates growth, builds confidence, and leads to success in both personal and professional life.
  `,
  author: "Azardeen",
  date: "2026-04-15",
  image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe",
},
{
  id: 5,
  title: "Best Tools for Task Management in 2026",
  short: "Explore modern tools to organize and track your tasks efficiently.",
  content: `
Task management tools have become essential in today’s fast-paced world. They help individuals and teams stay organized and productive.

Popular tools like Notion, Trello, and Todoist offer features such as task tracking, reminders, and collaboration. These tools allow you to manage tasks visually and efficiently.

Choosing the right tool depends on your needs. If you prefer simplicity, go for minimal apps. If you need advanced features, choose tools with automation and integrations.

Using task management tools helps reduce stress because everything is organized in one place. You can easily track progress and deadlines.

In 2026, smart tools with AI features are becoming more popular, helping users automate tasks and improve productivity.
  `,
  author: "Azardeen",
  date: "2026-04-16",
  image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
}
];

  const blog = blogs.find((b) => b.id === Number(id));

  if (!blog) {
    return <h2 className="p-6">Blog not found</h2>;
  }

  return (
    <div className="p-6 bg-[#F5F7FB] min-h-screen">
      
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-600"
      >
        ← Back
      </button>

      <div className="bg-white rounded-xl shadow p-6">
        <img
          src={blog.image}
          className="w-full h-60 object-cover rounded-lg"
        />

        <h1 className="text-2xl font-bold mt-4">{blog.title}</h1>

        <p className="text-gray-600 mt-4 leading-relaxed">
          {blog.content}
        </p>
      </div>
    </div>
  );
}