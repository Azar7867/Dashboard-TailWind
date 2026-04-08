export default function Header() {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-semibold">Welcome back, Alex!</h1>

      <div className="flex gap-4 items-center">
        <input
          type="text"
          placeholder="Search reports..."
          className="px-4 py-2 rounded-lg border"
        />
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg">
          <img
            src="https://i.pravatar.cc/40"
            className="w-8 h-8 rounded-full"
          />
          <span>Alex Johnson</span>
        </div>
      </div>
    </div>
  );
}