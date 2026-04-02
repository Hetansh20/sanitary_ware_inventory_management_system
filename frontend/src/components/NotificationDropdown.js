import React from "react";
import { FiBell } from "react-icons/fi";
import StatusBadge from "./StatusBadge";

export default function NotificationDropdown({ open, alerts, recentTransactions }) {
  if (!open) return null;

  return (
    <div className="absolute right-0 top-12 z-40 w-[340px] rounded-2xl border border-slate-200 bg-white p-3 shadow-xl dark:border-slate-700 dark:bg-slate-900">
      <div className="mb-2 flex items-center justify-between">
        <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">Notifications</h4>
        <StatusBadge label={`${alerts.length + recentTransactions.length}`} tone="info" />
      </div>

      <div className="max-h-80 space-y-2 overflow-y-auto">
        {alerts.slice(0, 4).map((alert) => {
          const critical = alert.currentStock <= Math.max(1, Math.floor(alert.reorderLevel * 0.5));
          return (
            <article key={`alert-${alert.id}`} className={`rounded-xl p-2 ${critical ? "bg-rose-50" : "bg-amber-50"}`}>
              <p className="text-xs font-semibold text-slate-700">Low stock: Tile #{alert.tileId}</p>
              <p className="text-xs text-slate-500">Current {alert.currentStock}, reorder {alert.reorderLevel}</p>
            </article>
          );
        })}

        {recentTransactions.slice(0, 4).map((item) => (
          <article key={`txn-${item.id}`} className="rounded-xl bg-slate-50 p-2 dark:bg-slate-800">
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">
              <FiBell className="mr-1 inline" /> {item.type} · {item.quantity}
            </p>
            <p className="text-xs text-slate-500">{item.date} · {item.reason}</p>
          </article>
        ))}

        {!alerts.length && !recentTransactions.length ? (
          <p className="rounded-xl bg-slate-50 p-3 text-xs text-slate-500 dark:bg-slate-800">No notifications.</p>
        ) : null}
      </div>
    </div>
  );
}
