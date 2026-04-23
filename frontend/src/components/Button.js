import React from "react";

export default function Button({ children, onClick, disabled, type = "button", variant = "primary", className = "", ...props }) {
  const baseStyle = "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95";
  const variants = {
    primary: "bg-black text-white hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-slate-200",
    secondary: "bg-white border border-slate-300 text-black hover:bg-slate-50 dark:bg-black dark:border-slate-600 dark:text-white dark:hover:bg-slate-900",
    danger: "bg-black text-white hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-slate-200"
  };

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${baseStyle} ${variants[variant] || variants.primary} ${className}`} {...props}>
      {children}
    </button>
  );
}
