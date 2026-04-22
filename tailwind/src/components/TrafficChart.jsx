import { useEffect, useState, useCallback } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const CARS_API_URL = "http://localhost:5000/api/cars";
const SALES_API_URL = "http://localhost:5000/api/sales";

// ── Tooltip for Cars ─────────────────────────────────────────────────────────
const CarTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-100 rounded-lg px-3 py-2 shadow-md text-sm">
      <p className="font-medium text-gray-700 mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} style={{ color: p.fill }} className="text-xs">
          {p.name}:{" "}
          <span className="font-medium">${p.value.toLocaleString()}</span>
        </p>
      ))}
    </div>
  );
};

// ── Tooltip for Monthly Sales ────────────────────────────────────────────────
const SalesTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-100 rounded-lg px-3 py-2 shadow-md text-sm">
      <p className="font-medium text-gray-700 mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} style={{ color: p.fill }} className="text-xs">
          {p.name}:{" "}
          <span className="font-medium">{p.value.toLocaleString()} units</span>
        </p>
      ))}
    </div>
  );
};

export default function TrafficChart() {
  // ── Shared ──────────────────────────────────────────────────────────────────
  const [view, setView] = useState("cars"); // "cars" | "monthly"

  // ── Cars state ──────────────────────────────────────────────────────────────
  const [carData, setCarData] = useState([]);
  const [carStatus, setCarStatus] = useState("loading");
  const [lastSync, setLastSync] = useState(null);
  const [filters, setFilters] = useState({ minPrice: "", maxPrice: "", offer: "" });

  // ── Monthly sales state ──────────────────────────────────────────────────────
  const [salesData, setSalesData] = useState([]);
  const [salesStatus, setSalesStatus] = useState("idle");

  // ── Fetch cars (auto-refresh every 5s) ───────────────────────────────────────
  const fetchCars = useCallback(async () => {
    try {
      const res = await fetch(CARS_API_URL);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      const raw = Array.isArray(json) ? json : (json.data ?? []);

      let cars = raw;
      if (filters.minPrice) cars = cars.filter((c) => c.price >= Number(filters.minPrice));
      if (filters.maxPrice) cars = cars.filter((c) => c.price <= Number(filters.maxPrice));
      if (filters.offer) cars = cars.filter((c) => (c.offer ?? 0) >= Number(filters.offer));

      setCarData(
        cars.map((car) => ({
          name: `${car.name} ${car.model}`,
          price: car.price,
          finalPrice:
            car.offer > 0
              ? Math.round(car.price * (1 - car.offer / 100))
              : car.price,
          offer: car.offer ?? 0,
        }))
      );
      setCarStatus("ok");
      setLastSync(new Date());
    } catch {
      setCarStatus("error");
    }
  }, [filters]);

  // ── Fetch monthly sales ───────────────────────────────────────────────────────
  // API returns: [{ month: "Jan", sales: 120 }, ...]
  // Matches mongoose Sales schema: { month: String, sales: Number }
  const fetchSales = useCallback(async () => {
    setSalesStatus("loading");
    try {
      const res = await fetch(SALES_API_URL);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      const raw = Array.isArray(json) ? json : (json.data ?? []);
      setSalesData(raw);
      setSalesStatus("ok");
    } catch {
      setSalesStatus("error");
    }
  }, []);

  // ── Effects ───────────────────────────────────────────────────────────────────
  useEffect(() => {
    fetchCars();
    const id = setInterval(fetchCars, 5000);
    return () => clearInterval(id);
  }, [fetchCars]);

  useEffect(() => {
    if (view === "monthly") fetchSales();
  }, [view, fetchSales]);

  // ── Derived metrics ───────────────────────────────────────────────────────────
  const totalCars = carData.length;
  const avgPrice = totalCars
    ? Math.round(carData.reduce((s, d) => s + d.price, 0) / totalCars)
    : 0;
  const avgDiscount = totalCars
    ? Math.round(carData.reduce((s, d) => s + d.offer, 0) / totalCars)
    : 0;

  const totalSalesUnits = salesData.reduce((s, d) => s + (d.sales ?? 0), 0);
  const avgSalesPerMonth = salesData.length
    ? Math.round(totalSalesUnits / salesData.length)
    : 0;
  const bestMonth = salesData.reduce(
    (best, d) => (d.sales > (best?.sales ?? 0) ? d : best),
    null
  );

  const handleFilter = (key) => (e) =>
    setFilters((prev) => ({ ...prev, [key]: e.target.value }));

  // Active status (depends on view)
  const status = view === "cars" ? carStatus : salesStatus;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">

      {/* ── Header ── */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <h2 className="text-base font-semibold text-gray-800">
            {view === "cars" ? "Car price overview" : "Monthly sales overview"}
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Live from{" "}
            <code className="text-blue-400 text-[11px]">
              {view === "cars" ? "localhost:5000/api/cars" : "localhost:5000/api/sales"}
            </code>
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Status pill */}
          <span
            className={`flex items-center gap-1.5 text-xs px-2 py-1 rounded-full font-medium ${
              status === "ok"
                ? "bg-green-50 text-green-600"
                : status === "error"
                ? "bg-red-50 text-red-500"
                : "bg-gray-50 text-gray-400"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                status === "ok"
                  ? "bg-green-500"
                  : status === "error"
                  ? "bg-red-400"
                  : "bg-gray-300"
              }`}
            />
            {status === "ok" ? "Live" : status === "error" ? "Offline" : "Connecting"}
          </span>

          {/* ── View Dropdown ── */}
          <select
            value={view}
            onChange={(e) => setView(e.target.value)}
            className="text-xs border border-gray-200 rounded-lg px-2.5 py-1.5 bg-white text-gray-600 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition cursor-pointer font-medium"
          >
            <option value="cars">🏷 Car prices</option>
            <option value="monthly">📅 Monthly sales</option>
          </select>
        </div>
      </div>

      {/* ── CARS VIEW ── */}
      {view === "cars" && (
        <>
          {/* Filters */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            {[
              { label: "Min price ($)", key: "minPrice", placeholder: "e.g. 10000" },
              { label: "Max price ($)", key: "maxPrice", placeholder: "e.g. 80000" },
              { label: "Min offer (%)", key: "offer", placeholder: "e.g. 5" },
            ].map(({ label, key, placeholder }) => (
              <div key={key} className="flex flex-col gap-1">
                <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">
                  {label}
                </label>
                <input
                  type="number"
                  placeholder={placeholder}
                  value={filters[key]}
                  onChange={handleFilter(key)}
                  className="w-full h-9 px-3 text-sm border border-gray-200 rounded-lg bg-white text-gray-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition"
                />
              </div>
            ))}
          </div>

          {/* Metric cards */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            {[
              { label: "Total cars", value: totalCars },
              { label: "Avg price", value: totalCars ? `$${avgPrice.toLocaleString()}` : "—" },
              { label: "Avg discount", value: totalCars ? `${avgDiscount}%` : "—" },
            ].map(({ label, value }) => (
              <div key={label} className="bg-gray-50 rounded-xl px-4 py-3">
                <p className="text-[11px] text-gray-400 mb-1">{label}</p>
                <p className="text-xl font-semibold text-gray-700">{value}</p>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex gap-4 mb-3">
            {[
              { color: "#3B82F6", label: "Original price" },
              { color: "#22C55E", label: "After discount" },
            ].map(({ color, label }) => (
              <span key={label} className="flex items-center gap-1.5 text-xs text-gray-500">
                <span className="w-2.5 h-2.5 rounded-sm" style={{ background: color }} />
                {label}
              </span>
            ))}
          </div>

          {/* Chart */}
          {carData.length > 0 ? (
            <ResponsiveContainer width="100%" height={240}>
              <BarChart
                data={carData}
                barCategoryGap="28%"
                margin={{ top: 4, right: 8, bottom: 0, left: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11, fill: "#9ca3af" }}
                  axisLine={false}
                  tickLine={false}
                  interval={0}
                  angle={carData.length > 4 ? -20 : 0}
                  textAnchor={carData.length > 4 ? "end" : "middle"}
                  height={carData.length > 4 ? 52 : 28}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#9ca3af" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `$${v >= 1000 ? (v / 1000).toFixed(0) + "k" : v}`}
                />
                <Tooltip content={<CarTooltip />} />
                <Bar dataKey="price" name="Original price" fill="#3B82F6" radius={[5, 5, 0, 0]} barSize={28} />
                <Bar dataKey="finalPrice" name="After discount" fill="#22C55E" radius={[5, 5, 0, 0]} barSize={28} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[240px] flex items-center justify-center text-sm text-gray-400">
              {carStatus === "error" ? "Could not reach API." : "No cars match these filters."}
            </div>
          )}

          {/* Footer */}
          <p className="text-[11px] text-gray-300 mt-3">
            {lastSync
              ? `Last synced ${lastSync.toLocaleTimeString()} · auto-refreshes every 5s`
              : "Waiting for data…"}
          </p>
        </>
      )}

      {/* ── MONTHLY SALES VIEW ── */}
      {view === "monthly" && (
        <>
          {/* Metric cards */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            {[
              { label: "Total units sold", value: totalSalesUnits.toLocaleString() },
              { label: "Avg / month", value: salesData.length ? `${avgSalesPerMonth.toLocaleString()}` : "—" },
              { label: "Best month", value: bestMonth ? `${bestMonth.month}` : "—" },
            ].map(({ label, value }) => (
              <div key={label} className="bg-gray-50 rounded-xl px-4 py-3">
                <p className="text-[11px] text-gray-400 mb-1">{label}</p>
                <p className="text-xl font-semibold text-gray-700">{value}</p>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex gap-4 mb-3">
            <span className="flex items-center gap-1.5 text-xs text-gray-500">
              <span className="w-2.5 h-2.5 rounded-sm" style={{ background: "#6366F1" }} />
              Units sold
            </span>
          </div>

          {/* Chart */}
          {salesStatus === "loading" ? (
            <div className="h-[240px] flex items-center justify-center text-sm text-gray-400">
              Loading monthly sales…
            </div>
          ) : salesData.length > 0 ? (
            <ResponsiveContainer width="100%" height={240}>
              <BarChart
                data={salesData}
                barCategoryGap="30%"
                margin={{ top: 4, right: 8, bottom: 0, left: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 11, fill: "#9ca3af" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#9ca3af" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<SalesTooltip />} />
                <Bar
                  dataKey="sales"
                  name="Units sold"
                  fill="#6366F1"
                  radius={[5, 5, 0, 0]}
                  barSize={28}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[240px] flex items-center justify-center text-sm text-gray-400">
              {salesStatus === "error" ? "Could not reach API." : "No sales data found."}
            </div>
          )}

          {/* Footer */}
          <p className="text-[11px] text-gray-300 mt-3">
            Fetched from{" "}
            <code className="text-blue-300 text-[11px]">GET /api/sales</code>
            {" "}· Sales model: {"{ month: String, sales: Number }"}
          </p>
        </>
      )}
    </div>
  );
}