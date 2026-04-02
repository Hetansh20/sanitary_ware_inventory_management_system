import React from "react";
import { FiInbox } from "react-icons/fi";

export default function EmptyState({ title = "No data", description = "No records found." }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 py-10 text-center dark:border-slate-700 dark:bg-slate-900">
      <FiInbox className="mb-3 text-slate-400 dark:text-slate-500" size={22} />
      <p className="text-sm font-semibold text-slate-700 dark:text-slate-100">{title}</p>
      <p className="mt-1 text-xs text-slate-500 dark:text-slate-300">{description}</p>
    </div>
  );
}
