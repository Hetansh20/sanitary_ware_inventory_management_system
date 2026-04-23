import React from "react";

const palettes = {
  success: "bg-slate-100 text-black dark:bg-slate-800 dark:text-white border-2 border-black dark:border-white",
  danger: "bg-black text-white dark:bg-white dark:text-black",
  warning: "bg-slate-50 text-black dark:bg-slate-900 dark:text-white border border-black dark:border-white",
  info: "bg-black text-white dark:bg-white dark:text-black",
  neutral: "bg-white text-black border border-slate-300 dark:bg-black dark:text-white dark:border-slate-600",
};

export default function StatusBadge({ label, tone = "neutral" }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${
        palettes[tone] || palettes.neutral
      }`}
    >
      {label}
    </span>
  );
}
