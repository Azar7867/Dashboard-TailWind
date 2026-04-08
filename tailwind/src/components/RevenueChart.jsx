import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";

const data = [
  { name: "Apr 01", uv: 5000, pv: 4000 },
  { name: "Apr 05", uv: 20000, pv: 15000 },
  { name: "Apr 10", uv: 8000, pv: 18000 },
  { name: "Apr 15", uv: 15000, pv: 20000 },
  { name: "Apr 20", uv: 28000, pv: 16000 },
  { name: "Apr 23", uv: 22000, pv: 25000 },
  { name: "Apr 28", uv: 35000, pv: 20000 },
  { name: "Apr 30", uv: 27000, pv: 40000 },
];

export default function RevenueChart() {
  return (
    <div className="bg-white p-5 rounded-xl shadow h-[300px]">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-gray-700">
          Revenue Overview (Last 30 Days)
        </h2>

        <select className="border rounded-lg px-3 py-1 text-sm">
          <option>Apr 01 - Apr 30</option>
        </select>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height="85%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorBlue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
            </linearGradient>

            <linearGradient id="colorGreen" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" vertical={false} />

          <XAxis
            dataKey="name"
            tick={{ fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            tickFormatter={(val) => `$${val / 1000}k`}
            tick={{ fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip />

          {/* BLUE LINE */}
          <Area
            type="monotone"
            dataKey="uv"
            stroke="#3B82F6"
            strokeWidth={3}
            fill="url(#colorBlue)"
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />

          {/* GREEN LINE */}
          <Area
            type="monotone"
            dataKey="pv"
            stroke="#10B981"
            strokeWidth={3}
            fill="url(#colorGreen)"
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}