import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FiAlertTriangle,
  FiBox,
  FiGrid,
  FiLogOut,
  FiMapPin,
  FiRepeat,
  FiShoppingBag,
  FiTruck,
  FiUsers,
  FiActivity,
  FiClock,
} from "react-icons/fi";

const navItems = [
  { path: "/dashboard", label: "Dashboard", icon: FiGrid, roles: ["admin", "staff"] },
  { path: "/tiles", label: "Tiles", icon: FiBox, roles: ["admin", "staff"] },
  { path: "/inventory", label: "Inventory", icon: FiActivity, roles: ["admin", "staff"] },
  { path: "/suppliers", label: "Suppliers", icon: FiTruck, roles: ["admin", "staff"] },
  { path: "/warehouses", label: "Warehouses", icon: FiMapPin, roles: ["admin", "staff"] },
  { path: "/orders", label: "Orders", icon: FiShoppingBag, roles: ["admin", "staff"] },
  { path: "/transfers", label: "Transfers", icon: FiRepeat, roles: ["admin", "staff"] },
  { path: "/users", label: "Users", icon: FiUsers, roles: ["admin"] },
  { path: "/transactions", label: "Transactions", icon: FiActivity, roles: ["admin", "staff"] },
  { path: "/alerts", label: "Alerts", icon: FiAlertTriangle, roles: ["admin", "staff"] },
  { path: "/activity", label: "Activity Logs", icon: FiClock, roles: ["admin", "staff"] },
];

export default function Sidebar({ isOpen, onClose, onLogout, role = "staff" }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <>
      {isOpen && (
        <button
          type="button"
          onClick={onClose}
          className="fixed inset-0 z-30 bg-slate-900/40 lg:hidden"
          aria-label="Close sidebar"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 border-r border-slate-800 bg-slate-950 text-slate-200 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex h-full flex-col p-4">
          <div className="mb-5 rounded-2xl bg-gradient-to-br from-sky-500 to-teal-500 p-4 text-slate-950">
            <p className="text-xs font-bold uppercase tracking-[0.2em]">TileFlow</p>
            <p className="mt-2 text-xl font-black">Inventory Studio</p>
            <p className="mt-1 text-xs font-semibold text-slate-900/80">Operational Dashboard</p>
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto">
            {navItems.filter((item) => item.roles.includes(role)).map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                      isActive
                        ? "bg-slate-800 text-white"
                        : "text-slate-300 hover:bg-slate-900 hover:text-white"
                    }`
                  }
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          <button
            type="button"
            onClick={handleLogout}
            className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-rose-600 px-3 py-2.5 text-sm font-bold text-white transition hover:bg-rose-700"
          >
            <FiLogOut size={16} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
