export default function StatsCard({ title, value, change }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <p className="text-gray-500">{title}</p>
      <h2 className="text-xl font-bold mt-2">{value}</h2>
      <p className="text-green-500 text-sm mt-1">{change}</p>
    </div>
  );
}