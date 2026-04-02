import React from "react";

export default function PermissionBanner({ message = "You are in view-only mode." }) {
  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800">
      {message}
    </div>
  );
}
