import React from "react";

export default function ChartCard({ title, children, actions }) {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">{title}</h3>
        <div>{actions}</div>
      </div>
      <div className="relative z-10 w-full">
        {children}
      </div>
    </section>
  );
}
