import React, { useState } from "react";
import { FiLock, FiUser } from "react-icons/fi";

export default function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const result = onLogin({ username, password });
    if (!result.ok) {
      setError("Invalid credentials. Use admin/admin123 or staff/staff123");
      return;
    }
    setError("");
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(125deg,#082f49_0%,#0f172a_45%,#134e4a_100%)] p-6 text-slate-100">
      <div className="mx-auto grid min-h-[calc(100vh-3rem)] max-w-6xl grid-cols-1 gap-6 md:grid-cols-2">
        <section className="flex flex-col justify-between rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-200">TileFlow</p>
            <h1 className="mt-4 text-4xl font-black leading-tight md:text-5xl">Inventory Control, Designed for Speed</h1>
            <p className="mt-4 max-w-md text-sm text-slate-300">
              Track tiles, suppliers, warehouses, and stock movement in one dashboard built for operational teams.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-xs text-slate-200">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">Live stock visibility</div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">Low-stock intelligence</div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">Supplier order tracking</div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">Transfer audit history</div>
          </div>
        </section>

        <section className="flex items-center justify-center rounded-3xl bg-white p-8 text-slate-800 shadow-2xl">
          <form className="w-full max-w-md space-y-5" onSubmit={handleSubmit}>
            <div>
              <h2 className="text-2xl font-black">Welcome back</h2>
              <p className="text-sm text-slate-500">Sign in to continue to your dashboard</p>
            </div>

            <label className="block">
              <span className="mb-1 block text-sm font-semibold">Username</span>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-3 text-sm outline-none ring-sky-100 transition focus:border-sky-400 focus:ring-2"
                  placeholder="admin"
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-semibold">Password</span>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-3 text-sm outline-none ring-sky-100 transition focus:border-sky-400 focus:ring-2"
                  placeholder="admin123"
                />
              </div>
            </label>

            {error ? <p className="rounded-xl bg-rose-50 p-3 text-sm font-medium text-rose-700">{error}</p> : null}

            <button
              type="submit"
              className="w-full rounded-xl bg-sky-600 py-3 text-sm font-bold text-white transition hover:bg-sky-700"
            >
              Sign in
            </button>

            <p className="text-center text-xs text-slate-500">Demo credentials: admin/admin123 or staff/staff123</p>
          </form>
        </section>
      </div>
    </div>
  );
}
