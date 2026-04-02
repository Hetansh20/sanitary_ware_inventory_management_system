import React from "react";

export default function StatCard({ title, value, icon: Icon, hint, tone = "sky" }) {
  const tones = {
    sky: "from-sky-500 to-cyan-500",
    emerald: "from-emerald-500 to-teal-500",
    amber: "from-amber-500 to-orange-500",
    rose: "from-rose-500 to-red-500",
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700 dark:bg-slate-900">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-300">{title}</p>
          <p className="mt-2 text-3xl font-black text-slate-800 dark:text-slate-100">{value}</p>
          {hint ? <p className="mt-2 text-xs font-medium text-slate-500 dark:text-slate-300">{hint}</p> : null}
        </div>
        <div className={`rounded-xl bg-gradient-to-br p-3 text-white ${tones[tone] || tones.sky}`}>
          {Icon ? <Icon size={18} /> : null}
        </div>
      </div>
    </div>
  );
}
