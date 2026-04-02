import React, { useMemo } from "react";
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { FiAlertTriangle, FiArchive, FiLayers, FiMapPin, FiTruck } from "react-icons/fi";
import ActivityTimeline from "../components/ActivityTimeline";
import ChartCard from "../components/ChartCard";
import DataTable from "../components/DataTable";
import StatCard from "../components/StatCard";
import StatusBadge from "../components/StatusBadge";

const palette = ["#0ea5e9", "#14b8a6", "#f59e0b", "#f43f5e", "#6366f1", "#22c55e"];

export default function DashboardPage({ tiles, inventory, suppliers, warehouses, transactions, alerts, resolveAlert }) {
  const totalStock = inventory.reduce((sum, item) => sum + item.quantityInStock, 0);
  const lowStockCount = inventory.filter((item) => item.quantityInStock <= item.reorderLevel).length;
  const activeAlerts = alerts.filter((alert) => alert.status === "open");

  const stockByCategory = useMemo(() => {
    const map = new Map();
    tiles.forEach((tile) => {
      const qty = inventory
        .filter((stock) => stock.tileId === tile.id)
        .reduce((sum, stock) => sum + stock.quantityInStock, 0);
      map.set(tile.category, (map.get(tile.category) || 0) + qty);
    });
    return Array.from(map.entries()).map(([name, value]) => ({ name, value }));
  }, [tiles, inventory]);

  const monthlyFlow = useMemo(() => {
    const map = new Map();
    transactions.forEach((item) => {
      const month = item.date.slice(0, 7);
      const existing = map.get(month) || { month, stockIn: 0, stockOut: 0 };
      if (item.type === "stock-in") existing.stockIn += item.quantity;
      if (item.type === "stock-out") existing.stockOut += item.quantity;
      map.set(month, existing);
    });
    return Array.from(map.values()).sort((a, b) => a.month.localeCompare(b.month));
  }, [transactions]);

  const topSelling = useMemo(() => {
    const sold = transactions.filter((item) => item.type === "stock-out");
    const map = new Map();
    sold.forEach((item) => {
      map.set(item.tileId, (map.get(item.tileId) || 0) + item.quantity);
    });
    return [...map.entries()]
      .map(([tileId, quantity]) => ({
        tileId,
        quantity,
        name: tiles.find((tile) => tile.id === tileId)?.name || `Tile ${tileId}`,
      }))
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5);
  }, [transactions, tiles]);

  const recentColumns = [
    { key: "date", header: "Date" },
    { key: "type", header: "Type", render: (row) => <StatusBadge label={row.type} tone={typeTone(row.type)} /> },
    { key: "quantity", header: "Quantity" },
    { key: "performedBy", header: "Performed By" },
    { key: "referenceId", header: "Reference" },
  ];

  const timeline = [...transactions]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 8)
    .map((item) => ({
      id: item.id,
      action: `${item.type} · ${item.quantity} units · ${item.reason}`,
      performedBy: item.performedBy || "Unknown",
      date: item.date,
    }));

  return (
    <div className="space-y-6">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard title="Total Tiles" value={tiles.length} icon={FiLayers} hint="Active SKUs cataloged" tone="sky" />
        <StatCard title="Total Stock" value={totalStock} icon={FiArchive} hint="Units across warehouses" tone="emerald" />
        <StatCard title="Low Stock Alerts" value={lowStockCount} icon={FiAlertTriangle} hint="Needs replenishment" tone="amber" />
        <StatCard title="Suppliers" value={suppliers.length} icon={FiTruck} hint="Approved vendors" tone="sky" />
        <StatCard title="Warehouses" value={warehouses.length} icon={FiMapPin} hint="Storage locations" tone="emerald" />
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <ChartCard title="Stock Distribution by Category">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={stockByCategory} dataKey="value" nameKey="name" outerRadius={90} label>
                  {stockByCategory.map((item, index) => (
                    <Cell key={`${item.name}-${index}`} fill={palette[index % palette.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Monthly Stock-In vs Stock-Out">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyFlow}>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" opacity={0.35} />
                <XAxis dataKey="month" tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={{ stroke: "#475569" }} />
                <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={{ stroke: "#475569" }} />
                <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid #334155", borderRadius: 10 }} labelStyle={{ color: "#e2e8f0" }} itemStyle={{ color: "#cbd5e1" }} />
                <Bar dataKey="stockIn" fill="#22c55e" radius={[6, 6, 0, 0]} />
                <Bar dataKey="stockOut" fill="#f59e0b" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-300">Recent Stock Transactions</h2>
          <DataTable columns={recentColumns} data={[...transactions].sort((a, b) => b.date.localeCompare(a.date))} pageSize={5} />
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-300">Top Selling Tiles</h3>
            <div className="space-y-2">
              {topSelling.length ? (
                topSelling.map((item) => (
                  <div key={item.tileId} className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 dark:bg-slate-800">
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{item.name}</p>
                    <StatusBadge label={`${item.quantity} sold`} tone="info" />
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500 dark:text-slate-300">No sales activity yet.</p>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-300">Low Stock Alerts</h2>
              <StatusBadge label={`${activeAlerts.length} open`} tone={activeAlerts.length ? "danger" : "success"} />
            </div>

            <div className="space-y-3">
              {activeAlerts.length ? (
                activeAlerts.slice(0, 5).map((alert) => {
                  const critical = alert.currentStock <= Math.max(1, Math.floor(alert.reorderLevel * 0.5));
                  return (
                    <div key={alert.id} className={`rounded-xl border p-3 ${critical ? "border-rose-200 bg-rose-50" : "border-amber-200 bg-amber-50"}`}>
                      <p className="text-sm font-bold text-slate-800">Tile #{alert.tileId} • Warehouse #{alert.warehouseId}</p>
                      <p className="mt-1 text-xs text-slate-600">
                        Current {alert.currentStock} / Reorder {alert.reorderLevel}
                      </p>
                      <div className="mt-2 flex items-center justify-between">
                        <StatusBadge label={critical ? "Critical" : "Warning"} tone={critical ? "danger" : "warning"} />
                        <button
                          type="button"
                          onClick={() => resolveAlert(alert.id)}
                          className="text-xs font-semibold text-slate-700 underline"
                        >
                          Mark resolved
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-medium text-emerald-700">
                  No active alerts. Inventory health is stable.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <ChartCard title="Recent Activity Timeline">
        <ActivityTimeline activities={timeline} />
      </ChartCard>
    </div>
  );
}

function typeTone(type) {
  if (type === "stock-in") return "success";
  if (type === "stock-out") return "warning";
  if (type === "damage") return "danger";
  return "info";
}
