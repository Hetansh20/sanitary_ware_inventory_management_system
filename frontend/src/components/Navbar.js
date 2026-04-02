import React, { useMemo, useState } from "react";
import { FiMenu, FiBell, FiMoon, FiSearch, FiSun } from "react-icons/fi";
import NotificationDropdown from "./NotificationDropdown";

export default function Navbar({
  title,
  subtitle,
  onMenuClick,
  onOpenSearch,
  unreadCount,
  alerts,
  transactions,
  theme,
  onToggleTheme,
  currentUser,
}) {
  const [openNotifications, setOpenNotifications] = useState(false);

  const recentTransactions = useMemo(() => [...transactions].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5), [transactions]);

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 px-4 py-4 backdrop-blur dark:border-slate-700 dark:bg-slate-950/90 md:px-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 lg:hidden"
          >
            <FiMenu size={18} />
          </button>
          <div>
            <h1 className="text-lg font-bold text-slate-800 dark:text-slate-100 md:text-xl">{title}</h1>
            <p className="text-xs text-slate-500 dark:text-slate-300 md:text-sm">{subtitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenSearch}
            className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 md:flex"
          >
            <FiSearch size={14} />
            Global Search
          </button>
          <button
            type="button"
            onClick={onToggleTheme}
            className="rounded-full bg-slate-100 p-2 text-slate-600 dark:bg-slate-800 dark:text-slate-200"
          >
            {theme === "dark" ? <FiSun size={16} /> : <FiMoon size={16} />}
          </button>
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpenNotifications((value) => !value)}
              className="relative rounded-full bg-slate-100 p-2 text-slate-600 dark:bg-slate-800 dark:text-slate-200"
            >
              <FiBell size={16} />
              {unreadCount > 0 ? (
                <span className="absolute -right-1 -top-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white">
                  {unreadCount}
                </span>
              ) : null}
            </button>
            <NotificationDropdown open={openNotifications} alerts={alerts} recentTransactions={recentTransactions} />
          </div>
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-sky-500 to-teal-500" />
          <div className="hidden text-right md:block">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-100">{currentUser?.name || "User"}</p>
            <p className="text-xs text-slate-500 dark:text-slate-300">{currentUser?.role || "staff"}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
