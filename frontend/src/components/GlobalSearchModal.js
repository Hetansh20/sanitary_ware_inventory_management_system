import React, { useEffect } from "react";
import { FiSearch } from "react-icons/fi";

export default function GlobalSearchModal({ open, query, onQueryChange, onClose, results }) {
  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-slate-900/80 p-4 pt-24">
      <div className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl dark:border-slate-700 dark:bg-slate-900">
        <div className="mb-3 flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 dark:border-slate-700">
          <FiSearch className="text-slate-400" />
          <input
            autoFocus
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search tiles, suppliers, warehouses"
            className="w-full bg-transparent text-sm outline-none"
          />
          <button type="button" onClick={onClose} className="text-xs font-semibold text-slate-500">
            ESC
          </button>
        </div>

        <div className="max-h-80 space-y-3 overflow-y-auto">
          {results.map((group) => (
            <div key={group.type}>
              <p className="mb-1 text-xs font-bold uppercase tracking-wider text-slate-500">{group.type}</p>
              <div className="space-y-1">
                {group.items.length ? (
                  group.items.map((item) => (
                    <article key={`${group.type}-${item.id}`} className="rounded-lg bg-slate-50 px-3 py-2 text-sm dark:bg-slate-800">
                      <span className="font-semibold">{highlight(item.title, query)}</span>
                      <span className="ml-2 text-xs text-slate-500">{highlight(item.subtitle, query)}</span>
                    </article>
                  ))
                ) : (
                  <p className="text-xs text-slate-400">No matches</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function highlight(text, query) {
  if (!query.trim()) return text;

  const source = String(text || "");
  const lower = source.toLowerCase();
  const term = query.toLowerCase();
  const idx = lower.indexOf(term);
  if (idx === -1) return source;

  return (
    <>
      {source.slice(0, idx)}
      <mark className="rounded bg-yellow-200 px-0.5 text-slate-900">{source.slice(idx, idx + term.length)}</mark>
      {source.slice(idx + term.length)}
    </>
  );
}
