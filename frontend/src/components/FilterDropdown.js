import React from "react";

export default function FilterDropdown({ label, value, onChange, options }) {
  return (
    <label className="flex min-w-[150px] flex-col gap-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
      {label}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold capitalize text-slate-700 shadow-sm outline-none transition-all hover:bg-slate-50 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-white dark:bg-slate-900">
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
