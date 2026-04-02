import React from "react";

export default function LoadingState({ label = "Loading..." }) {
  return (
    <div className="flex items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white p-8">
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-sky-500 border-r-transparent" />
      <span className="text-sm font-medium text-slate-600">{label}</span>
    </div>
  );
}
