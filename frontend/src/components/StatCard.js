import React from "react";

export default function StatCard({ title, value, icon: Icon, hint, tone = "sky" }) {
  const tones = {
    sky: "bg-slate-100 text-black dark:bg-slate-800 dark:text-white",
    emerald: "bg-slate-100 text-black dark:bg-slate-800 dark:text-white",
    amber: "bg-slate-100 text-black dark:bg-slate-800 dark:text-white",
    rose: "bg-slate-100 text-black dark:bg-slate-800 dark:text-white",
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <div className="relative flex items-start justify-between z-10">
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">{title}</p>
          <p className="mt-2 text-3xl font-black tracking-tight text-slate-800 transition-colors group-hover:text-slate-900 dark:text-slate-100 dark:group-hover:text-white">{value}</p>
          {hint ? <p className="mt-2 text-xs font-semibold text-slate-500 dark:text-slate-400">{hint}</p> : null}
        </div>
        <div className={`rounded-xl p-3 ${tones[tone] || tones.sky}`}>
          {Icon ? <Icon size={20} /> : null}
        </div>
      </div>
    </div>
  );
}
