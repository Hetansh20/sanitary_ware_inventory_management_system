import React, { useMemo, useState } from "react";
import DataTable from "../components/DataTable";
import FilterDropdown from "../components/FilterDropdown";
import StatusBadge from "../components/StatusBadge";
import FormModal from "../components/FormModal";

export default function AuditLogsPage({ auditLogs }) {
  const [moduleFilter, setModuleFilter] = useState("all");
  const [actionFilter, setActionFilter] = useState("all");
  const [userFilter, setUserFilter] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedLog, setSelectedLog] = useState(null);

  // Extract unique users for the dropdown
  const uniqueUsers = useMemo(() => {
    const map = new Map();
    auditLogs.forEach(log => {
      if (log.user) {
        map.set(log.user._id, log.user.name);
      }
    });
    return Array.from(map, ([value, label]) => ({ value, label }));
  }, [auditLogs]);

  const filteredLogs = useMemo(() => {
    return auditLogs.filter(log => {
      const uId = log.user?._id || log.user;
      
      const matchModule = moduleFilter === "all" || log.module === moduleFilter;
      const matchAction = actionFilter === "all" || log.action === actionFilter;
      const matchUser = userFilter === "all" || uId === userFilter;
      
      const time = new Date(log.createdAt).getTime();
      const matchStart = !startDate || time >= new Date(startDate).getTime();
      const matchEnd = !endDate || time <= new Date(endDate).getTime() + 86400000;

      return matchModule && matchAction && matchUser && matchStart && matchEnd;
    });
  }, [auditLogs, moduleFilter, actionFilter, userFilter, startDate, endDate]);

  const columns = [
    { key: "createdAt", header: "Timestamp", render: (row) => new Date(row.createdAt).toLocaleString() },
    { key: "user", header: "User", render: (row) => <span className="font-semibold">{row.user?.name || "System"}</span> },
    { key: "module", header: "Module" },
    { key: "action", header: "Action", render: (row) => (
      <span className={`px-2 py-0.5 text-xs font-bold rounded ${row.action === 'CREATE' ? 'bg-emerald-100 text-emerald-700' : row.action === 'DELETE' ? 'bg-rose-100 text-rose-700' : 'bg-sky-100 text-sky-700'}`}>
        {row.action}
      </span>
    )},
    { key: "details", header: "Details", render: (row) => (
      <button 
        onClick={() => setSelectedLog(row)} 
        className="text-xs font-bold text-sky-600 hover:text-sky-800 underline"
      >
        View Diff
      </button>
    )}
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
        <FilterDropdown label="User" value={userFilter} onChange={setUserFilter} options={[{label: "All Users", value: "all"}, ...uniqueUsers]} />
        <FilterDropdown label="Module" value={moduleFilter} onChange={setModuleFilter} options={[
          {label: "All Modules", value: "all"},
          {label: "Product", value: "Product"},
          {label: "User", value: "User"},
          {label: "Supplier", value: "Supplier"},
          {label: "Order", value: "Order"},
          {label: "Category", value: "Category"}
        ]} />
        <FilterDropdown label="Action" value={actionFilter} onChange={setActionFilter} options={[
          {label: "All Actions", value: "all"},
          {label: "CREATE", value: "CREATE"},
          {label: "UPDATE", value: "UPDATE"},
          {label: "DELETE", value: "DELETE"}
        ]} />
        <label className="flex min-w-[150px] flex-col gap-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
          From
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm" />
        </label>
        <label className="flex min-w-[150px] flex-col gap-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
          To
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm" />
        </label>
      </div>

      <DataTable columns={columns} data={filteredLogs} emptyTitle="No audit logs found." emptyDescription="Try adjusting your filters." />

      <FormModal isOpen={!!selectedLog} title={`Audit Details: ${selectedLog?.module} ${selectedLog?.action}`} onClose={() => setSelectedLog(null)}>
        {selectedLog && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <p className="font-bold text-slate-500 uppercase mb-2">Before State</p>
                <pre className="whitespace-pre-wrap overflow-x-auto text-slate-700 bg-white p-2 rounded border border-slate-100 max-h-64 overflow-y-auto">
                  {selectedLog.beforeState ? JSON.stringify(selectedLog.beforeState, null, 2) : "null"}
                </pre>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <p className="font-bold text-slate-500 uppercase mb-2">After State</p>
                <pre className="whitespace-pre-wrap overflow-x-auto text-slate-700 bg-white p-2 rounded border border-slate-100 max-h-64 overflow-y-auto">
                  {selectedLog.afterState ? JSON.stringify(selectedLog.afterState, null, 2) : "null"}
                </pre>
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <button type="button" onClick={() => setSelectedLog(null)} className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold hover:bg-slate-50">Close</button>
            </div>
          </div>
        )}
      </FormModal>
    </div>
  );
}
