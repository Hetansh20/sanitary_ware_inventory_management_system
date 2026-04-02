import React from "react";

export default function ChartCard({ title, children, actions }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-300">{title}</h3>
        <div>{actions}</div>
      </div>
      {children}
    </section>
  );
}
