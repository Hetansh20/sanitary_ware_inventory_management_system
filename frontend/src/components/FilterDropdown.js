import React from "react";

export default function FilterDropdown({ label, value, onChange, options }) {
  return (
    <label className="flex min-w-[170px] flex-col gap-1 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-300">
      {label}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium capitalize text-slate-700 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-sky-900"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
