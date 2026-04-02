import React from "react";

export default function ActivityTimeline({ activities }) {
  return (
    <div className="space-y-3">
      {activities.length ? (
        activities.map((item) => (
          <div key={item.id} className="relative rounded-xl border border-slate-200 bg-white p-3 pl-6 dark:border-slate-700 dark:bg-slate-900">
            <span className="absolute left-2 top-4 h-2.5 w-2.5 rounded-full bg-sky-500" />
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-100">{item.action}</p>
            <p className="text-xs text-slate-500 dark:text-slate-300">
              {item.performedBy} · {item.date}
            </p>
          </div>
        ))
      ) : (
        <p className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900">
          No activity logs found.
        </p>
      )}
    </div>
  );
}
